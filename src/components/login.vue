<template>
  <div class="login">
    <div class="userData">
      <p>
        <i v-show="flag" class="el-icon-circle-close"></i>
        {{ message }}
      </p>
      <span :class="{ fontRed: fontRedN == 1 }">{{ info1 }}</span>
    </div>
    <el-input
      v-model="userName"
      @blur="affirmName"
      :class="{ redBorder: redN == 1 }"
      placeholder="请输入用户名"
    ></el-input>
    <div class="userData">
      <span :class="{ fontRed: fontRedP == 1 }">{{ info2 }}</span>
    </div>
    <el-input
      placeholder="请输入密码"
      @blur="affirmPw"
      :class="{ redBorder: redP == 1 }"
      v-model="userPassword"
      show-password
      @keyup.enter.native="login"
    ></el-input>
    <el-button
      ref="btn"
      :class="{ gray: bgGray == 1 }"
      :disabled="disInfo"
      @click="login"
    >{{ loginInfo }}</el-button>
  </div>
</template>
<script>
export default {
  props: ["flag1", "username", "flag2"],
  data() {
    return {
      //图标显示or隐藏
      flag: false,
      //发送AJax后提示
      message: "",
      //提示
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
      //控制注册后设置的按钮信息
      disInfo: false,
      bgGray: 0,
      loginInfo: "登录"
    };
  },
  methods: {
    affirmName() {
      if (this.userName == "") {
        this.info1 = "用户名不能为空";
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
    affirmPw() {
      if (this.userPassword == "") {
        this.info2 = "密码不能为空";
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
    login() {
      //判断键入为合法的字符时再发送AJax请求
      if ((this.affirmName() == true) & (this.affirmPw() == true)) {
        //先设置按钮信息
        this.disInfo = true;
        this.loginInfo = "登录中,请稍后";
        this.bgGray = 1;
        //再发送AJax请求(判断是否密码和账号对不对)
        var obj = {
          username: this.userName,
          password: this.userPassword
        };
        this.$http
          .post("http://localhost:4000/check", obj, { emulateJSON: true })
          .then(
            response => {
              console.log(response.body);
              //用户名不存在
              if (response.body.flag == 0) {
                this.flag = true;
                this.message = "用户名不存在";
                setTimeout(() => {
                  this.flag = false;
                  this.message = "";
                }, 3000);
              }
              //用户名密码错误
              else if (response.body.flag == 2) {
                this.flag = true;
                this.message = "密码错误";
                setTimeout(() => {
                  this.flag = false;
                  this.message = "";
                }, 3000);
              } else {
                //把token存入localstorage中

                //1.组织token对象
                var token = response.body;

                //2.存到localstorage上
                localStorage.setItem("token", JSON.stringify(token));

                //提示登录成功!,再返回到主页面上
                this.$message({
                  message: "你好,尊敬的会员",
                  type: "success"
                });
                //向父组件发射方法,改变值,再发送username过去,再把你好xxxx显示出来
                this.$emit("success", false, token.username, true);
                this.$parent.close();

                //(让父组件执行getInfo方法获取对应人的对应信息)
                this.$parent.getInfo();

                this.$parent.getInnerInfo();
              }
            },
            response => {
              console.log("请求失败");
            }
          );
        this.disInfo = false;
        this.loginInfo = "登录";
        this.bgGray = 0;
      }
    }
  }
};
</script>

<style scoped>
p {
  text-align: center;
  height: 24px;
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
