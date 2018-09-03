let express = require('express');
let utility = require('utility');

let app = express();

app.get('/', function (req, res) {
    let q = req.query.q;
    q = utility.md5(q);
    res.send(`q的md5值为${q}`);
})

app.listen('3000', function () {
    console.log('app.js is running at port 3000');
})