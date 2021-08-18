<template>
  <div class="login">
    <div class="userData">
      <p>
        <i v-show="flag1" class="el-icon-circle-close"></i>
        {{ message }}
      </p>
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
      placeholder="请输入旧密码"
      v-model="userPassword"
      show-password
      @blur="affirmPw"
      @input="checkPw"
      :class="{ redBorder: redP == 1 }"
    ></el-input>

    <div class="userData">
      <span :class="{ fontRed: fontRedNp == 1 }">{{ info3 }}</span>
    </div>
    <el-input
      type="password"
      placeholder="请输入新密码"
      v-model="userNewPassword"
      show-password
      @blur="affirmNewPw"
      @input="checkNewPw"
      :class="{ redBorder: redNp == 1 }"
      @keyup.enter.native="reset"
    ></el-input>

    <el-button
      @click="reset"
      :class="{ gray: bgGray == 1 }"
      :disabled="disInfo"
      >{{ resetInfo }}</el-button
    >
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: "",
      info1: "用户名:",
      info2: "旧密码:",
      info3: "新密码",

      //加边框
      redP: 0,
      redN: 0,
      redNp: 0,

      //加字体颜色
      fontRedN: 0,
      fontRedP: 0,
      fontRedNp: 0,

      //信息
      userName: "",
      userPassword: "",
      userNewPassword: "",

      //判断回调成功(用户名唯一性)
      flag: false,
      //判断图标显示与否
      flag1: false,

      //控制注册后设置的按钮信息
      resetInfo: "重置密码",
      bgGray: 0,
      disInfo: false,
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
          username: this.userName,
        };
        this.$http.get("http://localhost:4000/checkName", { params: obj }).then(
          (response) => {
            console.log(response.body);
            if (response.body.flag == 0) {
              this.info1 = "用户名不存在";
              this.redN = 1;
              this.fontRedN = 1;
            } else {
              this.flag = true;
              this.info1 = "用户名";
              this.redN = 0;
              this.fontRedN = 0;
            }
          },
          (response) => {
            console.log("请求失败");
          }
        );
      }
    },

    //密码的处理放在前端,不需要发送ajax请求
    //每次键入判断旧密码
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
        this.info2 = "旧密码";
        this.redP = 0;
        this.fontRedP = 0;
        return true;
      }
    },

    //失去光标判断旧密码
    affirmPw() {
      if (this.userPassword == "") {
        this.info2 = "旧密码不能为空";
        this.redP = 1;
        this.fontRedP = 1;
        return false;
      } else if (this.checkPw()) {
        return true;
      }
    },

    //每次键入判断新密码
    checkNewPw() {
      if (
        (this.userNewPassword.indexOf(" ") != -1) |
        /.*[\u4e00-\u9fa5]+.*$/.test(this.userNewPassword) |
        (this.userNewPassword.length < 8)
      ) {
        this.info3 = "密码不能包含空格或汉字且不小于8位";
        this.redNp = 1;
        this.fontRedNp = 1;
        return false;
      } else {
        this.info3 = "新密码";
        this.redNp = 0;
        this.fontRedNp = 0;
        return true;
      }
    },

    //失去光标判断新密码
    affirmNewPw() {
      if (this.userNewPassword == "") {
        this.info3 = "新密码不能为空";
        this.redNp = 1;
        this.fontRedNp = 1;
        return false;
      } else if (this.checkNewPw()) {
        return true;
      }
    },

    //重置密码
    reset() {
      //为空时提交
      if (
        (this.affirmName() == false) &
        (this.affirmPw() == false) &
        (this.affirmNewPw() == false)
      ) {
        this.info1 = "用户名不能为空";
        this.redN = 1;
        this.fontRedN = 1;

        this.info2 = "旧密码不能为空";
        this.redP = 1;
        this.fontRedP = 1;

        this.info3 = "新密码不能为空";
        this.redNp = 1;
        this.fontRedNp = 1;
        return;
      } else if (
        (this.flag == true) &
        (this.affirmPw() == true) &
        (this.affirmNewPw() == true)
      ) {
        //符合注册条件时
        this.disInfo = true;
        this.loginInfo = "重置中,请稍后";
        this.bgGray = 1;

        //组织对象
        var obj = {
          username: this.userName,
          oldPassword: this.userPassword,
          newPassword: this.userNewPassword,
        };

        //再发送AJax
        this.$http
          .post("http://localhost:4000/resetPassword", obj, {
            emulateJSON: true,
          })
          .then(
            (response) => {
              //0 旧密码错误 1,修改成功 2,修改失败
              console.log(response.body);
              if (response.body.flag == 1) {
                this.$message({
                  message: "恭喜你，修改成功,请登录",
                  type: "success",
                });
                window.location.href = "/#/login";
                console.log("测试location后的代码还会执行");
                return;
              }
              if (response.body.flag == 0) {
                this.flag1 = true;
                this.message = "旧密码错误";
                this.disInfo = false;
                this.bgGray = 0;

                setTimeout(() => {
                  this.flag1 = false;
                  this.message = "";
                }, 3000);

                //可终止下面的判断,但不能返回值给回调
                return;
              }
              if (response.body.flag == 2) {
                this.$notify({
                  title: "警告",
                  message: "修改失败,请联系系统开发者",
                  type: "warning",
                });
              }
            },
            (response) => {
              console.log("请求失败");
            }
          );
      }
    },
  },
};
</script>

<style scoped>
.login {
  margin-top: 0px !important;
}
p {
  height: 16px;
  text-align: center;
  color: #f46464;
}
.fontRed {
  color: #f56c6c;
}
.redBorder >>> .el-input__inner {
  border: 1px solid #f56c6c;
  border-radius: 4px;
}
.userData {
  margin-top: 1px;
  margin-left: 2px;
}
.el-input {
  margin-top: 2px;
  font-size: 16px;
}
.el-button {
  color: white;
  margin-top: 15px;
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
