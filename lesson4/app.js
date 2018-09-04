let eventproxy = require('eventproxy');
let cheerio = require('cheerio');
let superagent = require('superagent');
let url = require('url');
let codeUrl = 'https://www.cnblogs.com';

superagent.get(codeUrl).end(function (err, res) {
    if (err) {
        return console.log(err);
    }
    let topicUrls = [];
    var $ = cheerio.load(res.text);
    $('.post_item .post_item_body .titlelnk').each(function (index, el) {
        $el = $(el);
        const href = url.resolve(codeUrl, $el.attr('href'));
        topicUrls.push(href);
    })
    console.log(topicUrls);

    let ep = new eventproxy(); //异步操作   after用于异步操作的重复执行
    ep.after('topic_html', topicUrls.length, function (topicList) { //参数一异步执行的函数，参数二执行次数，参数三异步操作结束后执行的函数
        topicList = topicList.map(function (item) {
            let $ = cheerio.load(item); // cheerio提供类似jQuery式操作dom的功能
            return {
                title: $('#cb_post_title_url').text(),
                href: $('#cb_post_title_url').attr('href')
            }
        })
        console.log(topicList);
    })

    topicUrls.forEach(function (item) {
        superagent.get(item).end(
            function (err, res) {
                if (err) {
                    return console.log(err)
                }
                ep.emit('topic_html', res.text) // 异步操作执行次数+1，直到到达指定次数，触发之后回调
            }
        )
    })
})