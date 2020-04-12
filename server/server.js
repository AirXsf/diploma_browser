let connection = require('./generalApi.js');

//跑马灯图片接口
module.exports.getBanner = (req, res) => {
  let sql = 'select * from banner';
  connection.connectDB(sql, null, results => {
    res.jsonp(results);
  });
};

//主页图片接口(根据传递来的参数查询相应的字段信息)
module.exports.getHome = (req, res) => {
  let classify = req.query.category;
  console.log(classify);
  let sql = 'select * from goods where category=?';
  let data = [classify];
  connection.connectDB(sql, data, results => {
    res.jsonp(results);
  });
};
