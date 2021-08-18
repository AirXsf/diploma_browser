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
        <i class="el-icon-goods"></i>
        <span>商品细节</span>
      </el-menu-item>
    </el-menu>

    <!--卡片-->
    <el-col :span="21" :offset="1">
      <el-card class="box-card" shadow="always">
        <div slot="header" class="clearfix">
          <span>商品</span>
        </div>
        <el-row>
          <el-col :span="9" :offset="3">
            <el-image fit="fill" :src="detail.img" />
          </el-col>
          <el-col :span="9">
            <el-col>{{ detail.description }}</el-col>
            <el-col :span="24">
              <el-divider></el-divider>
            </el-col>

            <el-col>
              <el-col :span="7">商品名:</el-col>
              <el-col :span="17">
                <span>{{ detail.name }}</span>
              </el-col>
            </el-col>

            <el-col>
              <el-col :span="7">价格:</el-col>
              <el-col :span="17">
                <span>{{ detail.price }}</span>
              </el-col>
            </el-col>

            <el-col>
              <el-col :span="7">运费:</el-col>
              <el-col :span="17">
                <span>包邮</span>
              </el-col>
            </el-col>

            <!--电子产品的数据-->
            <el-col v-show="flag">
              <el-col :span="7">网络类型:</el-col>
              <el-col :span="17">
                <span>无需合约版</span>
              </el-col>
            </el-col>

            <el-col v-show="flag">
              <el-col :span="7">套餐类型:</el-col>
              <el-col :span="17">
                <span>官网标配</span>
              </el-col>
            </el-col>

            <el-col v-show="flag">
              <el-col :span="7">购买方式:</el-col>
              <el-col :span="17">
                <span>裸机</span>
              </el-col>
            </el-col>

            <!--潮流服鞋的数据-->
            <el-col v-show="flag1">
              <el-col :span="7">尺码:</el-col>
              <el-col :span="17">
                <span>{{ size }}</span>
              </el-col>
            </el-col>

            <el-col v-show="flag1">
              <el-col :span="7">款式:</el-col>
              <el-col :span="17">
                <span>运动休闲鞋</span>
              </el-col>
            </el-col>

            <el-col v-show="flag1">
              <el-col :span="7">闭合方式:</el-col>
              <el-col :span="17">
                <span>系带</span>
              </el-col>
            </el-col>

            <!--图书影音的数据-->
            <el-col v-show="flag2">
              <el-col :span="7">作者:</el-col>
              <el-col :span="17">
                <span>{{ author }}</span>
              </el-col>
            </el-col>

            <el-col v-show="flag2">
              <el-col :span="7">类别:</el-col>
              <el-col :span="17">
                <span>{{ category }}</span>
              </el-col>
            </el-col>

            <el-col v-show="flag2">
              <el-col :span="7">是否是套装:</el-col>
              <el-col :span="17">
                <span>否</span>
              </el-col>
            </el-col>

            <!--综合乐器的数据-->
            <el-col v-show="flag5">
              <el-col :span="7">套餐类型:</el-col>
              <el-col :span="17">
                <span>官网标配</span>
              </el-col>
            </el-col>

            <el-col v-show="flag5">
              <el-col :span="7">购买方式:</el-col>
              <el-col :span="17">
                <span>直接购买</span>
              </el-col>
            </el-col>

            <el-col v-show="flag5">
              <el-col :span="7">提货方式:</el-col>
              <el-col :span="17">
                <span>邮寄</span>
              </el-col>
            </el-col>

            <el-col>
              <el-col :span="7">数量:</el-col>
              <el-col :span="17">
                <span>
                  <el-input-number
                    size="small"
                    v-model="num"
                    :min="1"
                    :max="1"
                    label="描述文字"
                  ></el-input-number>
                </span>
              </el-col>
            </el-col>

            <el-col :span="17">
              <el-divider></el-divider>
            </el-col>

            <el-col>
              <el-col :span="7">
                <el-button type="danger" plain @click="purchase"
                  >立即购买</el-button
                >
              </el-col>
              <el-col :span="8">
                <span>
                  <el-tooltip :content="ifCart" placement="top">
                    <el-button
                      type="danger"
                      plain
                      @click="joinCart"
                      :class="{ bgc: flag11 == 1 }"
                      >加入购物车</el-button
                    >
                  </el-tooltip>
                </span>
              </el-col>
              <el-col :span="5">
                <el-tooltip :content="ifCollect" placement="top">
                  <el-button
                    type="danger"
                    :class="{ bgc: flag10 == 1 }"
                    plain
                    icon="el-icon-star-off"
                    @click="preserve"
                    circle
                  ></el-button>
                </el-tooltip>
              </el-col>
            </el-col>
          </el-col>
        </el-row>
        <!--分割线-->
        <el-row>
          <el-col :span="24">
            <el-divider></el-divider>
          </el-col>
        </el-row>
        <!--评论部分-->
        <div class="el-card__header">
          <div class="clearfix">
            <span>评论</span>
          </div>
        </div>

        <!--评论容器-->
        <el-row class="comment">
          <el-col :span="6" :offset="1">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入商品评价"
              v-model="textarea"
            ></el-input>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-rate v-model="rateValue" show-text></el-rate>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" plain @click="insertComment"
              >发表</el-button
            >
          </el-col>
        </el-row>

        <el-row>
          <el-col class="horizontal">
            <el-divider></el-divider>
          </el-col>
        </el-row>

        <!--评论区得内容 -->
        <el-table :data="commentData" border style="width: 100%">
          <el-table-column
            prop="date"
            label="时间"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="username"
            label="会员名"
            width="150"
          ></el-table-column>
          <el-table-column prop="level" label="星级" width="180">
            <template slot-scope="scope">
              <el-rate
                v-model="scope.row.level"
                disabled="true"
                show-text
              ></el-rate>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="评论内容"></el-table-column>
        </el-table>
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
            <el-link type="danger" @click="removeCollect(scope.row.name)"
              >移去</el-link
            >
          </template>
        </el-table-column>
      </el-table>

      <!--表格(不用这种)
      <table class="el-table" style="width: 100%">
        <div class="el-table__header-wrapper">
          <table cellspacing="0" cellpadding="0" class="el-table__header" style="width:100%;">
            <thead class="has-gutter">
              <tr>
                <th class="el-table_4_column_7 is-leaf">
                  <div class="cell">商品名</div>
                </th>
                <th class="el-table_4_column_8 is-leaf">
                  <div class="cell">价格</div>
                </th>
                <th class="el-table_4_column_9 is-leaf">
                  <div class="cell">图片</div>
                </th>
                <th class="el-table_4_column_10 is-leaf">
                  <div class="cell">操作</div>
                </th>
              </tr>
            </thead>
          </table>
        </div>
        <tbody>
          <tr class="row" v-for="item in tableData" :key="item.name">
            <el-col :span="5" :offset="2">
              <td>{{item.name}}</td>
            </el-col>
            <el-col :span="4" :offset="1">
              <td>{{item.price}}</td>
            </el-col>
            <el-col :span="3" :offset="2">
              <td>
                <el-image :src="item.img" fit="fill"></el-image>
              </td>
            </el-col>
            <el-col :span="4" :offset="3">
              <td>
                <el-link type="danger">移去</el-link>
              </td>
            </el-col>
          </tr>
        </tbody>
      </table>
      -->
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
      title: "xx",
      //选中哪个标签
      activeIndex: "6",
      //传来的数据
      detail: {},
      //公共数据
      num: 1,

      //电子产品独有的数据
      flag: false,

      //潮流服鞋独有的数据
      flag1: false,
      size: "",

      //图书独有的数据
      flag2: false,
      author: "",
      category: "",

      //乐器独有的数据
      flag5: false,

      //我的(总数据)
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

      //收藏夹(数据)
      table: false,
      tableData: [],

      //控制不重复收藏
      reCollect: true,

      //收藏变红
      flag10: 0,

      //收藏提示
      ifCollect: "未收藏",

      //收藏量
      collectNumber: null,

      //搜索关键字
      search1: "",

      //购物车数据
      gridData: [],
      dialogTableVisible: false,

      //数目
      cartNumber: null,

      //购物车中有没有
      ifCart: "未加入购物车",

      //加入购物车变红
      flag11: 0,

      //控制不重复加入
      reJoin: true,

      //多选框的值
      multipleSelection: [],

      //watch时用的数据
      total_price: "0￥",

      //评价的值
      rateValue: null,

      textarea: "",

      commentData: [],
    };
  },
  created() {
    //获取数据渲染
    this.getDetail();

    //查询此商品有没有被收藏
    this.getIndexOf();

    //获取收藏夹中的信息
    this.getCollect();

    //获取购物车里的信息
    this.getCart();

    //查询有没有加入购物车
    this.getJoinCart();

    //查询评论表里面的数据
    this.getComment();
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

  /*用computed也可计算总价格
  computed: {
    total_price() {
      //这里不加if和else也可完成,但不够严谨,会造成性能浪费!
      if (this.multipleSelection.length != 0) {
        var sum = 0;
        this.multipleSelection.forEach(item => {
          //截取￥前面的数值
          sum += parseInt(item.price.substring(0, item.price.indexOf("￥")));
        });
        return sum + "￥";
      } else {
        return "0￥";
      }
    }
  },
  */

  methods: {
    //注销后提示回首页登录才能操作
    confirm(fn) {
      if (localStorage.getItem("token")) {
        fn();
      } else {
        this.$message.error("账户已注销,请返回主页登录");
      }
    },

    //跳回首页
    jump() {
      window.location.href = "/";
    },

    //跳转自己
    jumpSelf() {
      this.confirm(() => {
        window.location.href = "../detail.html";
      });
    },

    //单击我的
    myself() {
      this.confirm(() => {
        this.outerInfo();
        this.dialog = true;
      });
    },

    //单击我的地址
    myAddress() {
      this.innerInfo();
      this.innerDrawer = true;
    },

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
      this.confirm(() => {
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
                //查到,把返回值给gridData;
                this.tableData = response.body;

                //收藏夹的数组的个数显示
                this.collectNumber = this.tableData.length;
              }
            },
            (reponse) => {
              console.log("响应失败");
            }
          );
      });
    },

    //查询有没有收藏过
    getIndexOf() {
      //先判断数据库中有没有收藏,如果收藏提示不要重复收藏,不重复再插入;
      if (localStorage.getItem("token")) {
        this.$http
          .get("http://localhost:4000/getIndexOf", {
            params: {
              name: this.detail.name,
              username: JSON.parse(localStorage.getItem("token")).username,
            },
          })
          .then(
            (response) => {
              if (response.body.flag == 1) {
                this.reCollect = false;
                this.flag10 = 1;
                this.ifCollect = "已收藏";
              } else {
                this.reCollect = true;
                this.flag10 = 0;
                this.ifCollect = "未收藏";
                console.log("可收藏");
              }
            },
            (reponse) => {
              console.log("请求失败");
            }
          );
      }
    },

    //收藏(增加字段到数据库中)
    preserve() {
      this.confirm(() => {
        //先判断,再添加
        if (this.reCollect) {
          this.$http
            .post("http://localhost:4000/joinCollect", {
              username: JSON.parse(localStorage.getItem("token")).username,
              name: this.detail.name,
              price: this.detail.price,
              img: this.detail.img,
            })
            .then(
              (response) => {
                console.log(response.body);
                if (response.body.flag == 1) {
                  //更新收藏数量
                  this.getCollect();
                  //避免重复收藏
                  this.reCollect = false;
                  this.ifCollect = "已收藏";
                  this.flag10 = 1;

                  //提示
                  this.$notify({
                    title: "成功",
                    message: "收藏成功",
                    type: "success",
                  });
                }
              },
              (response) => {
                console.log("响应失败");
              }
            );
        } else {
          this.$notify.error({
            title: "错误",
            message: "已收藏,请不要重复收藏",
          });
        }
      });
    },

    //移去收藏夹中的信息
    removeCollect(name) {
      this.confirm(() => {
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

                //看有没有收藏
                this.getIndexOf();

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

    //购买(提示购买成功!)
    purchase() {
      this.confirm(() => {
        this.$message({
          message: "恭喜你，购买成功",
          type: "success",
        });
      });
    },

    //获取sessionStorage中的数据,渲染
    getDetail() {
      if (localStorage.getItem("token")) {
        this.detail = JSON.parse(sessionStorage.getItem("detail"));

        //如果是电子产品显示相应内容
        if (this.detail.category == "电子产品") {
          this.flag = true;
        }

        //如果是图书显示相应内容
        if (this.detail.category == "潮流服鞋") {
          this.flag1 = true;
          //找码这个字
          var index = this.detail.description.indexOf("码");
          //截取尺码
          this.size = this.detail.description.substring(index - 2, index);
        }

        //如果是相应内容
        if (this.detail.category == "图书影音") {
          this.flag2 = true;
          //以指定符号分割字符串为数组;
          var array = this.detail.description.split(",");
          console.log(array);

          //截取数组中的指定字符
          this.category = array[0].substring(3);
          this.author = array[1].substring(3);
        }
        //如果是电子产品显示相应内容
        if (this.detail.category == "综合乐器") {
          this.flag5 = true;
        }
      }
    },

    //外面抽屉方法(单击提交时)
    handleClose1(done) {
      this.confirm(() => {
        //去空格
        this.form.member = this.form.member.replace(/\s*/g, "");
        this.form.sex = this.form.sex.replace(/\s*/g, "");
        this.form.age = this.form.age.replace(/\s*/g, "");
        this.form.college = this.form.college.replace(/\s*/g, "");
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

    //里面抽屉的方法(单击提交时)
    handleClose2(done) {
      //去空格
      this.form.name = this.form.name.replace(/\s*/g, "");
      this.form.number = this.form.number.replace(/\s*/g, "");
      this.form.postCode = this.form.postCode.replace(/\s*/g, "");
      this.form.address = this.form.address.replace(/\s*/g, "");
      this.confirm(() => {
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

    //判断有没有添加到购物车了
    getJoinCart() {
      if (localStorage.getItem("token")) {
        this.$http
          .get("http://localhost:4000/getJoinCart", {
            params: {
              name: this.detail.name,
              username: JSON.parse(localStorage.getItem("token")).username,
            },
          })
          .then(
            (response) => {
              if (response.body.flag == 1) {
                this.reJoin = false;
                this.flag11 = 1;
                this.ifCart = "已加入购物车";
              } else {
                this.reJoin = true;
                this.flag11 = 0;
                this.ifCart = "未加入购物车";
              }
            },
            (reponse) => {
              console.log("请求失败");
            }
          );
      }
    },

    //加入到购物车
    joinCart() {
      this.confirm(() => {
        //先判断,再添加
        if (this.reJoin) {
          this.$http
            .post("http://localhost:4000/joinCart", {
              username: JSON.parse(localStorage.getItem("token")).username,
              name: this.detail.name,
              price: this.detail.price,
              img: this.detail.img,
            })
            .then(
              (response) => {
                console.log(response.body);
                if (response.body.flag == 1) {
                  //更新收藏数量
                  this.getCart();

                  //避免重复收藏
                  this.reJoin = false;
                  this.ifCart = "已加入购物车";
                  this.flag11 = 1;

                  //提示
                  this.$notify({
                    title: "成功",
                    message: "加入购物车成功",
                    type: "success",
                  });
                }
              },
              (response) => {
                console.log("响应失败");
              }
            );
        } else {
          this.$notify.error({
            title: "错误",
            message: "已加入,请不要重复加入",
          });
        }
      });
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
                //获取最新的个人购物车
                this.getCart();

                //更新加入购物车了没
                this.getJoinCart();

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

                  //刷新有没有加入购物车
                  this.getJoinCart();

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

    //查询评论表里面的数据(查comment表)
    getComment() {
      if (localStorage.getItem("token")) {
        //组织对象
        var obj = {
          name: JSON.parse(sessionStorage.getItem("detail")).name,
        };
        this.$http
          .get("http://localhost:4000/getComment", { params: obj })
          .then(
            (response) => {
              if (response.body.length == 0) {
                this.commentData = response.body;
              } else {
                //倒着排,一个方法解决(reverse);
                this.commentData = response.body.reverse();
              }
            },
            (response) => {
              console.log("响应失败");
            }
          );
      }
    },

    //增加评论到评论表中
    insertComment() {
      this.confirm(() => {
        //去空格
        var textarea = this.textarea.replace(/\s*/g, "");
        //获取当前年月日
        if ((textarea == "") | (this.rateValue == null)) {
          this.$notify.error({
            title: "错误",
            message: "评论和星级都不能少哦",
          });
        } else {
          var datetime = new Date();
          var year = datetime.getFullYear();
          var month =
            datetime.getMonth() + 1 < 10
              ? "0" + (datetime.getMonth() + 1)
              : datetime.getMonth() + 1;
          var day =
            datetime.getDate() < 10
              ? "0" + datetime.getDate()
              : datetime.getDate();
          var date = year + "-" + month + "-" + day;

          //组织对象
          var obj = {
            date: date,
            username: JSON.parse(localStorage.getItem("token")).username,
            level: this.rateValue,
            content: this.textarea,
            name: JSON.parse(sessionStorage.getItem("detail")).name,
          };
          console.log(obj);
          this.$http.post("http://localhost:4000/insertComment", obj).then(
            (response) => {
              console.log(response.body);
              if (response.body.flag == 1) {
                this.$notify({
                  title: "成功",
                  message: "评论成功",
                  type: "success",
                });
                //清空数据
                this.textarea = "";
                this.rateValue = null;
                //更新评论
                this.getComment();
              } else {
                this.$notify.info({
                  title: "消息",
                  message: "评论失败,请联系管理员",
                });
              }
            },
            (response) => {
              console.log("响应失败");
            }
          );
        }
      });
    },
  },
};
</script>

<style lang="scss">
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

//卡片
.el-col-21 {
  .box-card {
    height: 100%;
    .el-card__header {
      span {
        font-size: 20px;
      }
    }
    .el-card__body {
      padding: 0px;
      .el-row {
        margin-top: 15px;
        .el-col-9 {
          font-size: 18px;
          .el-col-24 {
            margin-top: 16px;
            &:nth-child(2) {
              margin-top: 10px;
            }
            .el-divider--horizontal {
              margin: 10px 0px 0px;
            }
          }
          .el-col-18 {
            .el-divider--horizontal {
              margin-top: 15px;
              margin-bottom: 5px;
            }
          }
        }
        .el-col-24 {
          margin-top: 30px;
          .el-divider--horizontal {
            margin-bottom: 0px;
          }
        }
        .el-col-2 {
          margin-top: 15px;
        }
        .el-col-3 {
          margin-top: 25px;
        }
        &:nth-child(5) {
          margin: 0px;
          .horizontal {
            margin-top: 0px;
          }
        }
      }
      .comment {
        margin-top: 24px;
      }
      .el-table {
        margin-top: 20px;
        margin-bottom: 40px;
      }
    }
  }
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
