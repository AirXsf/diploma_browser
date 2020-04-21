let express = require('express');

let router = express.Router();

let server = require('./server.js');

//跑马灯图片
router.get('/getBanner', server.getBanner);

//主页图片
router.get('/getHome', server.getHome);

//检查注册的用户名是否存在及合法性
router.get('/checkName', server.checkName);

//注册
router.post('/register', server.register);

//检查登录
router.post('/check', server.check);

module.exports = router;
