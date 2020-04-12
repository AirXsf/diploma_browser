let express = require('express');

let router = express.Router();

let server = require('./server.js');

//跑马灯图片
router.get('/getBanner', server.getBanner);

//主页图片
router.get('/getHome', server.getHome);

module.exports = router;
