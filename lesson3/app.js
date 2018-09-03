let express = require('express');
let superagent = require('superagent');
let cheerio = require('cheerio');

let app = express();

app.get('/', function (req, res, next) {
    superagent.get('https://www.cnblogs.com').end(function (err, sres) {
        if (err) {
            next(err);
        }
        let $ = cheerio.load(sres.text);
        let items = [];
        $('.post_item .post_item_body .titlelnk').each(function (index ,el) {
            let $el = $(el);
            items.push({
                title: $el.html(),
                href: $el.attr('href')
            })
        })
        res.send(items);
    })
})

app.listen('3000', function () {
    console.log('success!');
});