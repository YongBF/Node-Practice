let async = require('async');

let connectCurrencyCount = 0;
let fetchUrl = function (url, callback) {
    let delay = parseInt(Math.random()*2000);
    connectCurrencyCount++;
    console.log(`现在的并发数量是${connectCurrencyCount},抓取${url}耗时${delay}秒`);
    setTimeout(function() {
        connectCurrencyCount--;
        callback(null, url);
    }, delay);
}

const urls = [];
for(let i=0; i<30; i++) {
    urls.push(`https://YongBF_${i}.com`);
}

async.mapLimit(urls, 5, function (url, callback) {
    fetchUrl(url, callback);
},function (err, result) {
    console.log(result);
})