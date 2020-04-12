let express = require('express');

let app = express();

let router = require('./router.js');

let bodyParser = require('body-parser');

//body-parser的设置

//处理post表单提交
app.use(bodyParser.urlencoded({ extended: false }));

//处理json格式的提交
app.use(bodyParser.json());

app.use(router);

app.listen('4000', () => {
  console.log('running');
});
