let connection = require('./generalApi.js');

//跑马灯图片接口
module.exports.getBanner = (req, res) => {
  let sql = 'select * from banner';
  connection.connectDB(sql, null, (results) => {
    res.jsonp(results);
  });
};

//主页图片接口(根据传递来的参数查询相应的字段信息)
module.exports.getHome = (req, res) => {
  /* 改为获取全部数据,所以就不需要这句了
  let classify = req.query.category;    
  console.log(classify);
  */
  let sql = 'select * from goods';
  connection.connectDB(sql, null, (results) => {
    res.jsonp(results);
  });
};

//查询有没有注册信息
module.exports.checkName = (req, res) => {
  let username = req.query.username;
  let sql = 'select count(*) as total from user where username=?';
  let data = [username];
  let obj = {};
  connection.connectDB(sql, data, (results) => {
    console.log(results);
    //查询
    if (results[0].total == 1) {
      obj = { flag: '1' };
    } else {
      obj = { flag: '0' };
    }
    res.json(obj);
  });
};

//注册信息
module.exports.register = (req, res) => {
  let paramData = req.body;
  let sql = 'insert into user set ?';
  let obj = {};
  connection.connectDB(sql, paramData, (results) => {
    if (results.affectedRows == 1) {
      obj = { flag: '1' };
    } else {
      obj = { flag: '0' };
    }
    res.json(obj);
  });
};

//检查登录
module.exports.check = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let obj = {};

  //用promise的方式试一下(解决回调地狱)
  function getJson(sql, data) {
    return new Promise((resolve, reject) => {
      //下面应该是一个异步的回调方法(此时是封装的异步回调的回调,不纯粹)
      connection.connectDB(sql, data, (results) => {
        resolve(results);
      });
    });
  }

  //sql data传入
  //先查用户名存不存在
  let sql = 'select count(*) as total from user where username=?';
  let data = [username];
  getJson(sql, data)
    .then((results) => {
      if (results[0].total == 1) {
        //有此用户名(再查数据库密码是否正确)--返回新的一个promise对象
        let sql =
          'select count(*) as total from user where username=? and password=?';
        let data = [username, password];
        return getJson(sql, data);
      } else {
        //无此用户名
        obj = { flag: '0' };
        res.json(obj);
      }
    })
    //下一层的回调
    .then((results) => {
      if (results[0].total == 1) {
        //成功查到
        obj = { flag: '1' };
      } else {
        //密码错误
        obj = { flag: '2' };
      }
      console.log('后面的不执行了');
      res.json(obj);
    })
    //因为promise异步操作中,return无效,所以一旦前面捕获到异常,直接抓住,后面不执行了。
    .catch((err) => {
      console.log(err.message);
    });

  /*
  connection.connectDB(sql, data, (results) => {
    if (results[0].total == 1) {
      //有此用户名(再查数据库密码是否正确)
      let sql =
        'select count(*) as total from user where username=? and password=?';
      let data = [username, password];
      connection.connectDB(sql, data, (results) => {
        if (results[0].total == 1) {
          //成功查到
          obj = { flag: '1' };
        } else {
          //密码错误
          obj = { flag: '2' };
        }
        res.json(obj);
      });
    } else {
      //无此用户名
      obj = { flag: '0' };
      res.json(obj);
    }
  });
  */
};
