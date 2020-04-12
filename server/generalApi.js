//加载mysql驱动(操作数据库的api)
let mysql = require('mysql');
exports.connectDB = (sql, data, callback1, sqlSolve, callback2) => {
  let paramSqlSolve = sqlSolve || null;
  let paramCallback2 = callback2 || null;
  //设置默认值
  let connection = mysql.createConnection({
    host: 'localhost', //服务器的ip或域名
    user: 'root', //登录数据库的账号
    password: '8490520w.', //登录数据库的密码
    database: 'warehouse', //这个数据库对应要操作表的数据库
  });

  connection.connect(); //连接数据库

  //操作数据库(查询)
  connection.query(sql, data, function (error, results, fields) {
    if (error) throw error;
    callback1(results);
  });

  if (paramSqlSolve) {
    connection.query(paramSqlSolve, null, function (error, results, fields) {
      if (error) throw error;
      paramCallback2();
    });
  }
  //关闭数据库
  connection.end();
};
