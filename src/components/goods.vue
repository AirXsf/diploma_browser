<template>
  <div>
    <!--页头组件-->
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index="1">
        <template slot="title">关于本站</template>
        <el-menu-item index="2.1">课题:优闲二手交易</el-menu-item>
        <el-menu-item index="2.2">借鉴:咸鱼APP</el-menu-item>
        <el-menu-item index="2.3">合作:VX-TRHXN50</el-menu-item>
        <el-submenu index="2.4">
          <template slot="title">开发者</template>
          <el-menu-item index="3.1">姓名:小思服</el-menu-item>
          <el-menu-item index="3.2">项目:毕业设计</el-menu-item>
          <el-menu-item index="3.3">毕业院校:合肥学院</el-menu-item>
        </el-submenu>
      </el-submenu>

      <el-menu-item index="2" @click="jump">
        <i class="el-icon-headset"></i>
        <span>首页</span>
      </el-menu-item>

      <el-menu-item index="3" @click="myself">
        <i class="el-icon-s-custom"></i>
        <span>我的</span>
      </el-menu-item>

      <el-menu-item index="4" @click="collect">
        <el-badge :value="collectNumber" type="info">
          <i class="el-icon-folder"></i>
          <span>收藏夹</span>
        </el-badge>
      </el-menu-item>

      <el-menu-item index="5" @click="cart">
        <el-badge :value="cartNumber" type="info">
          <i class="el-icon-shopping-cart-full"></i>
          <span>购物车</span>
        </el-badge>
      </el-menu-item>

      <el-menu-item index="6" @click="jumpSelf">
        <i class="el-icon-search"></i>
        <span>搜索成果</span>
      </el-menu-item>
    </el-menu>

    <!--卡片-->
    <el-col
      :span="7"
      :offset="1"
      v-for="(item, index) in newList"
      :key="item.id"
    >
      <el-card class="box-card" shadow="always">
        <div slot="header" class="clearfix">
          <span>{{ item.category }}</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="detail(index)"
            >宝贝详情</el-button
          >
        </div>
        <el-image fit="fill" :src="item.img" />
        <div class="information">
          <el-row>
            <el-col :span="24">
              <a>
                <span>{{ item.name }}</span>
              </a>
              <el-divider direction="vertical"></el-divider>
              <a>
                <span>{{ item.price }}</span>
              </a>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-divider></el-divider>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-col>

    <!--我的模块 -->
    <el-drawer
      title="我的信息(此处不显示,因为设置了:with-header)!"
      :before-close="handleClose1"
      :visible.sync="dialog"
      custom-class="demo-drawer"
      ref="drawer"
      :with-header="false"
      size="32%"
    >
      <div class="demo-drawer__content">
        <!--外面的抽屉-->
        <p>
          <i class="el-icon-user"></i>
          我的信息:
          <span v-show="flag3">每个信息都不能为空哦</span>
        </p>
        <el-form :model="form">
          <el-form-item label="会员名" :label-width="formLabelWidth">
            <el-input
              placeholder="请输入会员名"
              v-model="form.member"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-select v-model="form.sex" placeholder="请选择">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="年龄" :label-width="formLabelWidth">
            <el-input
              placeholder="年龄"
              v-model="form.age"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="毕业院校" :label-width="formLabelWidth">
            <el-input
              placeholder="请输入毕业院校"
              v-model="form.college"
              autocomplete="off"
              @keyup.enter.native="$refs.drawer.closeDrawer()"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer el-row">
          <el-col :span="6" :offset="4">
            <el-button @click="cancelForm1">取 消</el-button>
          </el-col>
          <el-col :span="6" :offset="3">
            <el-button
              type="primary"
              @click="$refs.drawer.closeDrawer()"
              :loading="loading"
              >{{ loading ? "提交中 ..." : "提交" }}</el-button
            >
          </el-col>
        </div>
        <p>
          <i class="el-icon-truck"></i>
          <i style="font-style:normal">我的地址:</i>
        </p>
        <div>
          <el-col :offset="4">
            <el-button @click="myAddress">单击前往</el-button>
          </el-col>
          <!--里面的抽屉-->
          <el-drawer
            title="我是里面的"
            :append-to-body="true"
            :visible.sync="innerDrawer"
            size="26%"
            :with-header="false"
          >
            <p>
              <i class="el-icon-truck"></i>
              我的地址:
              <span v-show="flag4">每个信息都不能为空哦</span>
            </p>
            <el-form :model="form">
              <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input
                  v-model="form.name"
                  placeholder="请输入姓名"
                  autocomplete="off"
                ></el-input>
              </el-form-item>

              <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input
                  v-model="form.number"
                  placeholder="请输入11位电话号码"
                  autocomplete="off"
                ></el-input>
              </el-form-item>

              <el-form-item label="邮政编码" :label-width="formLabelWidth">
                <el-input
                  v-model="form.postCode"
                  placeholder="请输入所在6位地区邮政编码"
                  autocomplete="off"
                ></el-input>
              </el-form-item>

              <el-form-item label="地址" :label-width="formLabelWidth">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入具体地址"
                  v-model="form.address"
                  autocomplete="off"
                  @keyup.enter.native="handleClose2"
                ></el-input>
              </el-form-item>
            </el-form>

            <div class="demo-drawer__footer el-row">
              <el-col :span="6" :offset="4">
                <el-button @click="cancelForm2">取 消</el-button>
              </el-col>
              <el-col :span="6" :offset="3">
                <el-button
                  type="primary"
                  @click="handleClose2"
                  :loading="loading"
                  >{{ loading ? "提交中 ..." : "提交" }}</el-button
                >
              </el-col>
            </div>
          </el-drawer>
        </div>
      </div>
    </el-drawer>

    <!--收藏夹模块 -->
    <el-drawer
      title="收藏夹!"
      :visible.sync="table"
      size="35%"
      label="ltr"
      :with-header="false"
      direction="rtl"
    >
      <div class="newTitle">
        <el-col :span="12">
          <i class="el-icon-folder"></i>
          <span>收藏夹</span>
        </el-col>
        <el-col :span="1" :offset="9">
          <button
            type="button"
            @click="closeCollect"
            class="el-drawer__close-btn"
          >
            <i class="el-dialog__close el-icon el-icon-close"></i>
          </button>
        </el-col>
      </div>

      <el-table
        :data="
          tableData.filter(
            (data) =>
              !search1 ||
              data.name.toLowerCase().includes(search1.toLowerCase())
          )
        "
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="商品名"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          width="120"
        ></el-table-column>

        <el-table-column prop="img" width="120" label="图片">
          <!--插入图片链接的代码-->
          <template slot-scope="scope">
            <img :src="scope.row.img" alt style="width: 50px;height: 50px" />
          </template>
        </el-table-column>

        <el-table-column width="137">
          <template slot="header">
            <el-input
              v-model="search1"
              size="mini"
              placeholder="输入商品名搜索"
            />
          </template>

          <template slot-scope="scope">
            <el-link type="danger" @click="remove(scope.row.name)"
              >移去</el-link
            >
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>

    <!--购物车模块-->
    <el-dialog
      title="提示"
      :visible.sync="dialogTableVisible"
      style="height:500px;"
      @close="close"
    >
      <!--这里的slot插槽可以替换title的值,所以加html样式和图标-->
      <div slot="title" style="font-size:23px;">
        <i class="el-icon-shopping-cart-full"></i>
        <span>购物车</span>
      </div>

      <el-table :data="gridData" @selection-change="handleSelectionChange">
        <el-table-column
          prop="name"
          label="商品名"
          width="145"
        ></el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          width="145"
        ></el-table-column>

        <el-table-column prop="img" width="145" label="图片">
          <!--插入图片链接的代码-->
          <template slot-scope="scope">
            <img :src="scope.row.img" alt style="width: 50px;height: 50px" />
          </template>
        </el-table-column>

        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-link type="danger" @click="removeCart(scope.row.name)"
              >移去</el-link
            >
          </template>
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-col :span="24">
          <el-col :span="4" :offset="16">
            <span>金额:{{ total_price }}</span>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-button type="danger" size="small" plain @click="cartPurchase"
              >立即购买</el-button
            >
          </el-col>
        </el-col>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //选中哪个标签
      activeIndex: "6",

      //新的数组渲染
      newList: [],

      //抽屉总数据
      dialog: false,
      loading: false,

      //外抽屉提示
      flag3: false,
      //内抽屉提示
      flag4: false,

      //里面数据
      innerDrawer: false,
      //抽屉表单中数据
      form: {
        //我的信息
        //用户名
        member: "",
        //性别
        sex: "",
        //年龄
        age: "",
        //院校:"",
        college: "",

        //收货信息
        name: "",
        number: "",
        address: "",
        postCode: "",

        //下面的变量是elementUi抽屉带的,没发现有啥用
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "80px",

      //计时器
      timer: null,

      //个人收藏夹的数据
      table: false,
      tableData: [],

      //控制不重复收藏
      reCollect: true,

      //收藏变红
      flag10: 0,

      //收藏提示
      ifCollect: "收藏商品",

      //收藏量
      collectNumber: null,

      //收藏关键字
      search1: "",

      //购物车数据
      gridData: [],
      dialogTableVisible: false,

      //数目
      cartNumber: null,

      //多选框的值
      multipleSelection: [],

      //watch时用的数据
      total_price: "0￥",
    };
  },
  created() {
    //搜索的结果渲染
    this.goods();

    //获取收藏夹中的信息
    this.getCollect();

    //获取购物车里的信息
    this.getCart();
  },
  //这里用watch也可实现计算总价格
  watch: {
    multipleSelection() {
      if (this.multipleSelection.length != 0) {
        var sum = 0;
        for (var i = 0; i < this.multipleSelection.length; i++) {
          sum += parseInt(
            this.multipleSelection[i].price.substring(
              0,
              this.multipleSelection[i].price.indexOf("￥")
            )
          );
        }
        this.total_price = sum + "￥";
        return;
      } else {
        this.total_price = "0￥";
      }
    },
  },
  methods: {
    //注销后提示回首页登录才能操作
    confirm(fn) {
      if (localStorage.getItem("token")) {
        fn();
      } else {
        this.$message.error("账户已注销,请返回主页登录");
      }
    },

    //我的
    myself() {
      this.confirm(() => {
        this.outerInfo();
        this.dialog = true;
      });
    },

    //我的地址
    myAddress() {
      this.innerInfo();
      this.innerDrawer = true;
    },

    //先接收数据,再渲染商品
    goods() {
      /* 这种方式不好用
    获取url?后面传来的数组(后再渲染),去掉前5个多余字符
    var val = window.location.search.substring(5);
    decode解码,去掉%22,再转为json对象
    this.newList = JSON.parse(decodeURI(val));
    console.log(this.newList);
    */

      //取sessionstorage中的数组对象
      this.confirm(() => {
        console.log(sessionStorage.getItem("search"));
        this.newList = JSON.parse(sessionStorage.getItem("search") || "[]");
        console.log(this.newList);
        if (this.newList.length == 0) {
          this.$message({
            message: "抱歉，没有找到符合的商品,请重新查询",
            type: "warning",
          });
        } else {
          this.$message({
            message: "搜索成功,结果如下",
            type: "success",
          });
        }
      });
    },
    //跳到详细页面(评论和细节)
    detail(index) {
      this.confirm(() => {
        console.log(index);
        //根据sessionStorage中搜索的数据,根据index存sessionStorage中
        var searchList = JSON.parse(sessionStorage.getItem("search"));

        //把商品信息存在sessionStorage中
        sessionStorage.setItem("detail", JSON.stringify(searchList[index]));
        window.open("../detail.html");
      });
    },

    //首页
    jump() {
      window.location.href = "/";
    },

    //跳转到自己
    jumpSelf() {
      this.confirm(() => {
        window.location.href = "../goods.html";
      });
    },

    //外面抽屉方法(单击提交时)
    handleClose1(done) {
      this.confirm(() => {
        //去空格
        this.form.member = this.form.member.replace(/\s*/g, "");
        this.form.sex = this.form.sex.replace(/\s*/g, "");
        this.form.age = this.form.age.replace(/\s*/g, "");
        this.form.college = this.form.college.replace(/\s*/g, "");
        //判断文本框不能为空,为空不能提交
        if (
          (this.form.member == "") |
          (this.form.sex == "") |
          (this.form.age == "") |
          (this.form.college == "")
        ) {
          this.flag3 = true;
          return;
        } else if (this.loading) {
          return;
        }
        this.loading = true;
        //发送Ajax请求,修改对象的信息值
        //拿出token,作为参数传递
        var token = JSON.parse(localStorage.getItem("token")).msg;
        var obj = {
          member: this.form.member,
          sex: this.form.sex,
          age: this.form.age,
          college: this.form.college,
          token: token,
        };
        this.$http.post("http://localhost:4000/alterInfo", obj).then(
          (response) => {
            console.log(response.body);
            if (response.body.flag == 1) {
              //关闭抽屉,显示更新成功
              this.timer = setTimeout(() => {
                done();
                // 动画关闭需要一定的时间
                setTimeout(() => {
                  this.loading = false;
                  this.dialog = false;
                  this.$notify({
                    title: "成功",
                    message: "更新成功",
                    type: "success",
                  });
                  //去掉提示
                  this.flag3 = false;
                }, 400);
              }, 1500);
            }
          },
          (response) => {
            console.log("请求失败");
          }
        );
      });
    },

    //取消外面抽屉
    cancelForm1() {
      this.loading = false;
      this.dialog = false;
      this.flag3 = false;
      clearTimeout(this.timer);
    },

    //里面抽屉的方法
    handleClose2(done) {
      this.confirm(() => {
        //去空格
        this.form.name = this.form.name.replace(/\s*/g, "");
        this.form.number = this.form.number.replace(/\s*/g, "");
        this.form.postCode = this.form.postCode.replace(/\s*/g, "");
        this.form.address = this.form.address.replace(/\s*/g, "");
        //判断不能
        if (
          (this.form.name == "") |
          (this.form.number == "") |
          (this.form.postCode == "") |
          (this.form.address == "")
        ) {
          this.flag4 = true;
          return;
        } else if (this.loading) {
          return;
        }
        this.loading = true;
        var token = JSON.parse(localStorage.getItem("token")).msg;
        var obj = {
          name: this.form.name,
          number: this.form.number,
          postCode: this.form.postCode,
          address: this.form.address,
          token: token,
        };
        this.$http.post("http://localhost:4000/alterInnerInfo", obj).then(
          (response) => {
            console.log(response.body);
            if (response.body.flag == 1) {
              //关闭抽屉,显示更新成功
              this.timer = setTimeout(() => {
                // 动画关闭需要一定的时间
                setTimeout(() => {
                  this.loading = false;
                  this.innerDrawer = false;
                  this.$notify({
                    title: "成功",
                    message: "更新成功",
                    type: "success",
                    position: "bottom-right",
                  });
                  //去掉提示
                  this.flag4 = false;
                }, 400);
              }, 1500);
            }
          },
          (response) => {
            console.log("请求失败");
          }
        );
      });
    },

    //取消里面的抽屉
    cancelForm2() {
      this.loading = false;
      this.innerDrawer = false;
      this.flag4 = false;
      clearTimeout(this.timer);
    },

    //拿数据渲染外抽屉
    outerInfo() {
      if (localStorage.getItem("token")) {
        var username = JSON.parse(localStorage.getItem("token")).username;
        console.log(username);
        var obj = {
          //这里没有主页面上的username属性,所以不能用this.username;
          username: username,
        };
        console.log(obj);
        this.$http.get("http://localhost:4000/getInfo", { params: obj }).then(
          (response) => {
            var info = response.body;
            console.log(info);
            if (info.flag == 0) {
              console.log("回调中的return没用");
            } else if ((info.flag == 1) & (info.member == null)) {
              this.form.member = "";
              this.form.sex = "";
              this.form.age = "";
              this.form.college = "";
            } else {
              this.form.member = info.member;
              this.form.sex = info.sex;
              this.form.age = info.age;
              this.form.college = info.college;
            }
          },
          (response) => {
            console.log("获取失败");
          }
        );
      }
    },

    //拿数据渲染内抽屉
    innerInfo() {
      if (localStorage.getItem("token")) {
        var username = JSON.parse(localStorage.getItem("token")).username;
        console.log(username);
        var obj = {
          //这里没有主页面上的username属性,所以不能用this.username;
          username: username,
        };
        console.log(obj);
        this.$http
          .get("http://localhost:4000/getInnerInfo", { params: obj })
          .then(
            (response) => {
              var info = response.body;
              console.log(info);
              if (info.flag == 0) {
                console.log("回调中的return无效");
              } else if ((info.flag == 1) & (info.name == null)) {
                this.form.name = "";
                this.form.number = "";
                this.form.postCode = "";
                this.form.address = "";
              } else {
                this.form.name = info.name;
                this.form.number = info.number;
                this.form.postCode = info.postCode;
                this.form.address = info.address;
              }
            },
            (response) => {
              console.log("获取失败");
            }
          );
      }
    },

    //收藏夹模块

    //关闭收藏夹
    closeCollect() {
      this.table = false;
      this.search1 = "";
    },

    //点击收藏夹
    collect() {
      this.confirm(() => {
        this.table = true;
        this.getCollect();
      });
    },

    //获取收藏夹中的信息;
    getCollect() {
      if (localStorage.getItem("token")) {
        var obj = {
          username: JSON.parse(localStorage.getItem("token")).username,
        };
        this.$http
          .get("http://localhost:4000/getCollect", { params: obj })
          .then(
            (response) => {
              console.log(response.body);
              //如果查不到数据,为空数组;
              if (response.body.length == 0) {
                this.tableData = [];
                this.collectNumber = null;
              } else {
                //查到,把返回值给tableData;
                this.tableData = response.body;

                //打收藏夹的数组的个数显示
                this.collectNumber = this.tableData.length;
              }
            },
            (reponse) => {
              console.log("响应失败");
            }
          );
      }
    },

    //移去收藏夹中的信息
    remove(name) {
      this.confirm(() => {
        console.log(name);
        //组织当前的信息
        var obj = {
          name: name,
          username: JSON.parse(localStorage.getItem("token")).username,
        };
        this.$http
          .get("http://localhost:4000/removeCollect", { params: obj })
          .then(
            (response) => {
              console.log(response.body);
              if (response.body.flag == 1) {
                //获取最新的个人收藏夹
                this.getCollect();

                //提示移去成功
                this.$notify({
                  title: "成功",
                  message: "移出成功",
                  type: "success",
                });
              }
            },
            (response) => {
              console.log("响应失败");
            }
          );
      });
    },

    //点击购物车
    cart() {
      this.confirm(() => {
        this.dialogTableVisible = true;
        this.getCart();
      });
    },

    //关闭购物车
    close() {
      this.total_price = "0￥";
    },

    //查询购物车(查询购物车里的物品);
    getCart() {
      if (localStorage.getItem("token")) {
        var obj = {
          username: JSON.parse(localStorage.getItem("token")).username,
        };
        this.$http.get("http://localhost:4000/getCart", { params: obj }).then(
          (response) => {
            console.log(response.body);
            //如果查不到数据,为空数组;
            if (response.body.length == 0) {
              this.gridData = [];
              this.cartNumber = null;
            } else {
              //查到,把返回值给tableData;
              this.gridData = response.body;

              //收藏夹的数组的个数显示
              this.cartNumber = this.gridData.length;
            }
          },
          (reponse) => {
            console.log("响应失败");
          }
        );
      }
    },

    //移出购物车
    removeCart(name) {
      this.confirm(() => {
        //组织当前的信息
        var obj = {
          name: name,
          username: JSON.parse(localStorage.getItem("token")).username,
        };
        this.$http
          .get("http://localhost:4000/removeCart", { params: obj })
          .then(
            (response) => {
              console.log(response.body);
              if (response.body.flag == 1) {
                //获取最新的个人收藏夹
                this.getCart();

                //提示移去成功
                this.$notify({
                  title: "成功",
                  message: "移出成功",
                  type: "success",
                });
              }
            },
            (response) => {
              console.log("响应失败");
            }
          );
      });
    },

    //选中多选框时
    handleSelectionChange: function(val) {
      this.multipleSelection = val;
      /*这里也可直接计算总价格,但最好放在computed中完成
      if (this.multipleSelection.length != 0) {
        var sum = 0;
        for (var i = 0; i < this.multipleSelection.length; i++) {
          sum += parseInt(
            this.multipleSelection[i].price.substring(
              0,
              this.multipleSelection[i].price.indexOf("￥")
            )
          );
        }
        this.total_price = sum + "￥";
        return;
      } else {
        this.total_price = "0￥";
      }
      */
    },

    //点击购物车立即购买后,(发送Ajax,清空数据库中相应的字段)
    cartPurchase() {
      this.confirm(() => {
        if (this.gridData.length == 0) {
          this.$notify.error({
            title: "错误",
            message: "购物车无商品",
          });
          return;
        } else if (this.multipleSelection.length == 0) {
          this.$notify.error({
            title: "错误",
            message: "请先勾选商品,再购买",
          });
        } else {
          this.$http
            .post("http://localhost:4000/deleteCart", {
              //选中的数组;
              list: this.multipleSelection,
              //用户名;
              username: JSON.parse(localStorage.getItem("token")).username,
            })
            .then(
              (response) => {
                console.log(response.body);
                if (response.body.flag == 1) {
                  this.$message({
                    message: "恭喜你，购买成功",
                    type: "success",
                  });
                  //刷新购物车,
                  this.getCart();
                  //刷新金额
                  this.total_price = "0￥";
                } else {
                  console.log("删除失败");
                }
              },
              (repsonse) => {
                console.log("响应失败");
              }
            );
        }
      });
    },
  },
};
</script>
<style lang="less">
.el-col-7 {
  margin-top: 30px;
  .information {
    text-align: center;
    .el-divider--horizontal {
      margin: 10px 0;
    }
    .el-row {
      margin-top: 7px;
      a:hover {
        color: #f50213;
      }
    }
    .el-divider--vertical {
      width: 1px;
      background-color: black;
    }
  }
}

//卡片自带的属性
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
//真正的流式,这里不应该加width,但是为了布局效果好看 加了
.box-card {
  width: 345px;
}

//我的样式
.demo-drawer__footer .el-button {
  width: 100%;
  height: 100%;
}
.demo-drawer__footer {
  margin-top: 40px;
}

.el-drawer__body p span {
  color: #f56c6c;
  margin-left: 5px;
}

//收藏夹
.el-drawer__body {
  .newTitle {
    overflow: hidden;
    margin-bottom: 20px;
    .el-col-12 {
      padding: 10px;
    }
    .el-col-1 {
      padding: 10px;
    }
  }
  .el-table td,
  .el-table th {
    text-align: center !important;
  }
  .el-table td {
    border: 0px;
  }
  .el-col-3 {
    td {
      padding: 0px;
    }
  }
}
//收藏后的样式
.bgc {
  background: #f56c6c !important;
  border-color: #f56c6c !important;
  color: #fff !important;
}

//购物车的样式
.el-dialog {
  .el-dialog__header {
    button {
      i {
        font-size: 23px;
      }
    }
  }
  .el-dialog__body {
    .el-table-column--selection {
      .cell {
        padding-left: 0px;
      }
    }
  }
  .el-dialog__footer {
    .dialog-footer {
      overflow: hidden;
      .el-col-24 {
        .el-col-4 {
          margin-top: 5px;
        }
      }
    }
  }
}
</style>
