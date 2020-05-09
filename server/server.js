let connection = require('./generalApi.js');

let jwt = require('jsonwebtoken');

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
    //查询
    if (results[0].total == 1) {
      obj = { flag: '1' };
    } else {
      obj = { flag: '0' };
    }
    res.json(obj);
  });
};

//注册信息(把用户名和密码注册到user表,用户名注册到address表);
module.exports.register = (req, res) => {
  //用promise(解决回调地狱)
  function getJson(sql, data) {
    return new Promise((resolve, reject) => {
      //下面应该是一个异步的回调方法(此时是封装的异步回调的回调,不纯粹)
      connection.connectDB(sql, data, (results) => {
        resolve(results);
      });
    });
  }

  let paramData = req.body;
  let sql = 'insert into user set ?';
  let obj = {};

  getJson(sql, paramData)
    .then((results) => {
      if (results.affectedRows == 1) {
        //把用户名插入到address表中
        let username = req.body.username;
        let sql = 'insert into address set ? ';
        let data = {
          username: username,
        };
        return getJson(sql, data);
      } else {
        obj = { flag: '0' };
        res.json(obj);
      }
    })
    //下一层插入到地址表
    .then((results) => {
      if (results.affectedRows == 1) {
        obj = { flag: '1' };
        res.json(obj);
      } else {
        obj = { flag: '2' };
        res.json(obj);
      }
    })
    //因为promise异步操作中,return无效,所以一旦前面捕获到异常,直接抓住,后面不执行了。
    .catch((err) => {
      console.log(err.message);
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
        let sql = 'select * from user where username=? and password=?';
        let data1 = [username, password];
        return getJson(sql, data1);
      } else {
        //无此用户名
        obj = { flag: '0' };
        res.json(obj);
      }
    })
    //下一层的回调
    .then((results) => {
      //密码错误,
      if (!results[0]) {
        obj = { flag: '2' };
        res.json(obj);
      } else {
        //打印所有的信息
        console.log(results[0]);

        //生成token
        let u_id = results[0].id;
        //数据(可为json对象)
        let payload = { id: u_id, admin: true };
        //签名(密钥)
        let secret = 'js';
        //创建token(sign 会返回以一个token)
        let token = jwt.sign(payload, secret, {
          // 授权时效365天失效
          expiresIn: '365 days',
        });

        //token及其他的值传到前端。
        res.json({
          status: 1,
          msg: token,
          //再返回众多信息
          username: results[0].username,
        });
      }
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

//修改密码
module.exports.resetPassword = (req, res) => {
  let username = req.body.username;
  let oldPassword = req.body.oldPassword;
  let newPassword = req.body.newPassword;
  let obj = {};

  let sql = 'select * from user where username=? and password=?';
  let data = [username, oldPassword];
  connection.connectDB(sql, data, (results) => {
    //查到此用户
    if (results[0]) {
      //继续下层回调(修改密码);
      let sql = 'update user set password=? where username=?';
      let data = [newPassword, username];
      connection.connectDB(sql, data, (results) => {
        if (results.affectedRows == 1) {
          //修改成功
          obj = {
            flag: '1',
          };
        } else {
          //修改失败
          obj = {
            flag: '2',
          };
        }
        res.json(obj);
      });
    } else {
      //密码错误
      obj = {
        flag: '0',
      };
      res.json(obj);
    }
  });
};

//修改用户外抽屉的信息
module.exports.alterInfo = (req, res) => {
  //接收参数
  let obj = req.body;

  //取出token
  let token = req.body.token;

  //解密token
  let payload = jwt.verify(token, 'js');

  //根据解码的内容的id值,判断是谁做的操作
  var id = payload.id;

  //根据id修改数据库中的值
  let data = [obj.member, obj.sex, obj.age, obj.college, id];
  let sql = 'update user set member=?,sex=?,age=?,college=? where id=? ';
  //更新表中的数据
  connection.connectDB(sql, data, (results) => {
    //成功
    if (results.affectedRows == 1) {
      res.json({
        flag: 1,
      });
    } else {
      res.json({
        flag: 0,
      });
    }
  });
};

//查询内抽屉用户的信息
module.exports.getInfo = (req, res) => {
  //接收参数
  let username = req.query.username;
  let sql = 'select member,sex,age,college from user where username=?';
  let data = [username];
  connection.connectDB(sql, data, (results) => {
    if (results[0]) {
      res.json({
        //此属性是为了我的信息里面为空时,判断不出错
        flag: 1,
        member: results[0].member,
        sex: results[0].sex,
        age: results[0].age,
        college: results[0].college,
      });
    } else {
      res.json({
        flag: 0,
      });
    }
  });
};

//查询外抽屉用户的信息
module.exports.getInnerInfo = (req, res) => {
  //接收参数
  let username = req.query.username;
  let sql = 'select name,number,postCode,address from address where username=?';
  let data = [username];
  connection.connectDB(sql, data, (results) => {
    if (results[0]) {
      res.json({
        //此属性是为了我的信息里面为空时,判断不出错
        flag: 1,
        name: results[0].name,
        number: results[0].number,
        postCode: results[0].postCode,
        address: results[0].address,
      });
    } else {
      res.json({
        flag: 0,
      });
    }
  });
};

//修改用户内抽屉的信息
module.exports.alterInnerInfo = (req, res) => {
  //接收参数
  let obj = req.body;

  //取出token
  let token = req.body.token;

  //解密token
  let payload = jwt.verify(token, 'js');

  //根据解码的内容的id值,判断是谁做的操作
  var id = payload.id;

  //根据id修改数据库中的值
  let data = [obj.name, obj.number, obj.postCode, obj.address, id];
  let sql =
    'update address set name=?,number=?,postCode=?,address=? where id=? ';
  //更新表中的数据
  connection.connectDB(sql, data, (results) => {
    //成功
    if (results.affectedRows == 1) {
      res.json({
        flag: 1,
      });
    } else {
      res.json({
        flag: 0,
      });
    }
  });
};

//查询收藏夹中的信息
module.exports.getCollect = (req, res) => {
  let username = req.query.username;
  let sql = 'select name,price,img from collection where username=?';
  let data = [username];
  connection.connectDB(sql, data, (results) => {
    if (results.length == 0) {
      let obj = [];
      res.json(obj);
    } else {
      res.json(results);
    }
  });
};

//查询有没有收藏过
module.exports.getIndexOf = (req, res) => {
  let obj = req.query;
  let flag = {};
  let data = [obj.username, obj.name];
  let sql = 'select price from collection where username=? and name=?';
  connection.connectDB(sql, data, (results) => {
    if (results[0]) {
      flag = {
        flag: '1',
      };
    } else {
      flag = {
        flag: '0',
      };
    }
    res.json(flag);
  });
};

//增加商品到收藏夹中
module.exports.joinCollect = (req, res) => {
  let obj = req.body;
  let flag = {};
  let sql = 'insert collection set ?';
  connection.connectDB(sql, obj, (results) => {
    if (results.affectedRows == 1) {
      flag = {
        flag: '1',
      };
    } else {
      flag = {
        flag: '0',
      };
    }
    res.json(flag);
  });
};

//移去个人收藏夹中的物品
module.exports.removeCollect = (req, res) => {
  let sql = 'delete from collection where username=? and name=?';
  let data = [req.query.username, req.query.name];
  let obj = {};
  connection.connectDB(sql, data, (results) => {
    if (results.affectedRows == 1) {
      let sqlSolve = 'alter table collection auto_increment = 1';
      connection.connectDB(sqlSolve, null, (results) => {
        console.log('设置删除后索引正常成功!');
        obj = {
          flag: '1',
        };
        res.json(obj);
      });
    } else {
      obj = {
        flag: '0',
      };
      res.json(obj);
    }
  });
};

//查询购物车中的信息
module.exports.getCart = (req, res) => {
  let username = req.query.username;
  let sql = 'select name,price,img from cart where username=?';
  let data = [username];
  connection.connectDB(sql, data, (results) => {
    if (results.length == 0) {
      let obj = [];
      res.json(obj);
    } else {
      res.json(results);
    }
  });
};

//查询有没有加入购物车
module.exports.getJoinCart = (req, res) => {
  let obj = req.query;
  let flag = {};
  let data = [obj.username, obj.name];
  let sql = 'select price from cart where username=? and name=?';
  connection.connectDB(sql, data, (results) => {
    if (results[0]) {
      flag = {
        flag: '1',
      };
    } else {
      flag = {
        flag: '0',
      };
    }
    res.json(flag);
  });
};

//增加商品到购物车中
module.exports.joinCart = (req, res) => {
  let obj = req.body;
  let flag = {};
  let sql = 'insert cart set ?';
  connection.connectDB(sql, obj, (results) => {
    if (results.affectedRows == 1) {
      flag = {
        flag: '1',
      };
    } else {
      flag = {
        flag: '0',
      };
    }
    res.json(flag);
  });
};

//移去购物车中的物品
module.exports.removeCart = (req, res) => {
  let sql = 'delete from cart where username=? and name=?';
  let data = [req.query.username, req.query.name];
  let obj = {};
  connection.connectDB(sql, data, (results) => {
    if (results.affectedRows == 1) {
      let sqlSolve = 'alter table collection auto_increment = 1';
      connection.connectDB(sqlSolve, null, (results) => {
        console.log('设置删除后索引正常成功!');
        obj = {
          flag: '1',
        };
        res.json(obj);
      });
    } else {
      obj = {
        flag: '0',
      };
      res.json(obj);
    }
  });
};

//购物车购买商品
module.exports.deleteCart = (req, res) => {
  let username = req.body.username;
  let list = req.body.list;

  //就一个商品时
  if (list.length == 1) {
    let sql = 'delete from cart where username=? and name=?';
    let data = [username, list[0].name];
    let obj = {};
    connection.connectDB(sql, data, (results) => {
      console.log(results);
      if (results.affectedRows == 1) {
        obj = {
          flag: '1',
        };
      } else {
        obj = {
          flag: '0',
        };
      }
      res.json(obj);
    });
  } else {
    //多商品时
    list.forEach((item, index) => {
      //最后一个商品删除时
      if (index == list.length - 1) {
        let sql = 'delete from cart where username=? and name=?';
        let data = [username, item.name];
        connection.connectDB(sql, data, (results) => {
          let obj = {};
          if (results.affectedRows == 1) {
            //设置删除索引正常
            let sqlSolve = 'alter table collection auto_increment = 1';
            connection.connectDB(sqlSolve, null, (results) => {
              console.log('设置删除后索引正常成功!');
              obj = {
                flag: '1',
              };
              res.json(obj);
            });
          } else {
            obj = {
              flag: '0',
            };
            res.json(obj);
          }
        });
      } else {
        let sql = 'delete from cart where username=? and name=?';
        let data = [username, item.name];
        connection.connectDB(sql, data, (results) => {
          if (results.affectedRows == 1) {
            console.log('删除成功');
          } else {
            console.log('删除失败');
          }
        });
      }
    });

    /*
      //第一个item
      if (index == 0) {
        sql += item.name;
      }
      //最后一个item
      else if (index == list.length - 1) {
        sql += ',' + item.name + ')';
      } else {
        sql += ',' + item.name;
      }
    });
    data = [username];
    */
  }
};

//查询评论
module.exports.getComment = (req, res) => {
  console.log('哈哈');
  console.log(req.query);
  let sql = 'select username,date,level,content from comment where name=?';
  let data = [req.query.name];
  connection.connectDB(sql, data, (results) => {
    console.log(results);
    res.json(results);
  });
};

//追加评论
module.exports.insertComment = (req, res) => {
  let data = req.body;
  console.log(data);
  let sql = 'insert comment set ?';
  let obj = {};
  connection.connectDB(sql, data, (results) => {
    if (results.affectedRows == 1) {
      obj = {
        flag: '1',
      };
    } else {
      obj = {
        flag: '0',
      };
    }
    res.json(obj);
  });
};
