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

//修改密码
router.post('/resetPassword', server.resetPassword);

//修改用户外抽屉的信息值
router.post('/alterInfo', server.alterInfo);

//查询用户外抽屉的信息值
router.get('/getInfo', server.getInfo);

//查询用户内抽屉的信息值
router.get('/getInnerInfo', server.getInnerInfo);

//修改用户内抽屉的信息值
router.post('/alterInnerInfo', server.alterInnerInfo);

//查询用户个人收藏夹中的信息
router.get('/getCollect', server.getCollect);

//查询有没有增加到个人收藏夹
router.get('/getIndexOf', server.getIndexOf);

//增加到个人收藏夹
router.post('/joinCollect', server.joinCollect);

//移去收藏夹中的物品
router.get('/removeCollect', server.removeCollect);

//查询购物车里面的信息
router.get('/getCart', server.getCart);

//判断有没有到购物车
router.get('/getJoinCart', server.getJoinCart);

//增加到个人购物车
router.post('/joinCart', server.joinCart);

//移去购物车中的物品
router.get('/removeCart', server.removeCart);

//购买购物车中的物品
router.post('/deleteCart', server.deleteCart);

//查询评论
router.get('/getComment', server.getComment);

//追加评论
router.post('/insertComment', server.insertComment);

module.exports = router;
