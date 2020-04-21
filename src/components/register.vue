<template>
  <div class="login">
    <div class="userData">
      <p></p>
      <span :class="{ fontRed: fontRedN == 1 }" ref="span1">{{ info1 }}</span>
    </div>
    <el-input
      type="text"
      v-model="userName"
      placeholder="请输入用户名"
      :class="{ redBorder: redN == 1 }"
      @blur="affirmName"
      @input="checkName"
    ></el-input>
    <div class="userData">
      <span :class="{ fontRed: fontRedP == 1 }">{{ info2 }}</span>
    </div>
    <el-input
      type="password"
      placeholder="请输入密码"
      v-model="userPassword"
      show-password
      @blur="affirmPw"
      @input="checkPw"
      :class="{ redBorder: redP == 1 }"
    ></el-input>
    <el-button @click="register" :class="{gray:bgGray==1}" :disabled="disInfo">{{registerInfo}}</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info1: "用户名:",
      info2: "密码:",
      //加边框
      redP: 0,
      redN: 0,
      //加字体颜色
      fontRedN: 0,
      fontRedP: 0,
      //信息
      userName: "",
      userPassword: "",
      //判断回调成功(用户名唯一性)
      flag: false,
      //控制注册后设置的按钮信息
      registerInfo: "注册",
      bgGray: 0,
      disInfo: false
    };
  },
  methods: {
    //每次键入判断
    checkName() {
      if (this.userName.indexOf(" ") != -1) {
        this.info1 = "用户名不能包含空格";
        this.redN = 1;
        this.fontRedN = 1;
        return false;
      } else {
        this.info1 = "用户名";
        this.redN = 0;
        this.fontRedN = 0;
        return true;
      }
    },
    //失去光标判断用户名
    affirmName() {
      if (this.userName == "") {
        this.info1 = "用户名不能为空";
        this.redN = 1;
        this.fontRedN = 1;
        return false;
        //判断键入为合法的字符时再发送AJax请求
      } else if (this.checkName()) {
        //用户名验证唯一性
        var obj = {
          username: this.userName
        };
        this.$http.get("http://localhost:4000/checkName", { params: obj }).then(
          response => {
            console.log(response.body);
            if (response.body.flag == 0) {
              this.flag = true;
              this.info1 = "用户名";
              this.redN = 0;
              this.fontRedN = 0;
            } else {
              this.info1 = "用户名已存在";
              this.redN = 1;
              this.fontRedN = 1;
            }
          },
          response => {
            console.log("请求失败");
          }
        );
      }
    },
    //密码的处理放在前端,不需要放送ajax请求
    //每次键入判断
    checkPw() {
      if (
        (this.userPassword.indexOf(" ") != -1) |
        /.*[\u4e00-\u9fa5]+.*$/.test(this.userPassword) |
        (this.userPassword.length < 8)
      ) {
        this.info2 = "密码不能包含空格或汉字且不小于8位";
        this.redP = 1;
        this.fontRedP = 1;
        return false;
      } else {
        this.info2 = "密码";
        this.redP = 0;
        this.fontRedP = 0;
        return true;
      }
    },
    //失去光标判断密码
    affirmPw() {
      if (this.userPassword == "") {
        this.info2 = "密码不能为空";
        this.redP = 1;
        this.fontRedP = 1;
        return false;
      } else if (this.checkPw()) {
        return true;
      }
    },
    //注册信息
    register() {
      if ((this.affirmName() == false) & (this.affirmPw() == false)) {
        this.info1 = "用户名不能为空";
        this.redN = 1;
        this.fontRedN = 1;
        this.info2 = "密码不能为空";
        this.redP = 1;
        this.fontRedP = 1;
        return;
      } else if ((this.flag == true) & (this.affirmPw() == true)) {
        //符合注册条件时
        this.disInfo = true;
        this.loginInfo = "注册中,请稍后";
        this.bgGray = 1;
        //再发送AJax
        var obj = {
          username: this.userName,
          password: this.userPassword
        };
        this.$http
          .post("http://localhost:4000/register", obj, { emulateJSON: true })
          .then(
            response => {
              if (response.body.flag == 1) {
                /*注册成功写入后(切换路由路由数据会重新刷新会默认值,所以此处不需要设置)
                this.disInfo = false;
                this.loginInfo = "注册";
                this.bgGray = 0;
                */
                this.$message({
                  message: "恭喜你，注册成功,请登录",
                  type: "success"
                });
                window.location.href = "/#/login";
              } else {
                this.$message.error("注册失败,请联系管理员");
              }
            },
            response => {
              console.log("请求失败");
            }
          );
      }
    }
  }
};
</script>

<style scoped>
p {
  height: 24px;
}
.fontRed {
  color: #f56c6c;
}
.redBorder >>> .el-input__inner {
  border: 1px solid #f56c6c;
  border-radius: 4px;
}
.userData {
  margin-top: 7px;
  margin-left: 2px;
}
.el-input {
  margin-top: 10px;
  font-size: 16px;
}
.el-button {
  color: white;
  margin-top: 25px;
  width: 100%;
  background: linear-gradient(135deg, #00d9ad, #0092ee) rgba(0, 0, 0, 0.1);
}
.gray {
  background: #545c64;
}
.gray:hover {
  background: #545c64;
  color: white;
}
</style>
