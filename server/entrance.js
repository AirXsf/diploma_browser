let express = require('express');

let app = express();

let router = require('./router.js');

let bodyParser = require('body-parser');

//设置允许跨域访问该服务.
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

//body-parser的设置

//处理post表单提交
app.use(bodyParser.urlencoded({ extended: false }));

//处理json格式的提交
app.use(bodyParser.json());

app.use(router);

app.listen(4000, () => {
  console.log('running');
});
