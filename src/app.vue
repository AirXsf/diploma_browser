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
        <el-menu-item index="1-1">课题:优闲二手交易</el-menu-item>
        <el-menu-item index="1-2">借鉴:咸鱼APP</el-menu-item>
        <el-menu-item index="1-3">合作:VX-TRHXN50</el-menu-item>
        <el-submenu index="1-4">
          <template slot="title">开发者</template>
          <el-menu-item index="1-4-1">姓名:小思服</el-menu-item>
          <el-menu-item index="1-4-2">项目:毕业设计</el-menu-item>
          <el-menu-item index="1-4-3">毕业院校:合肥学院</el-menu-item>
        </el-submenu>
      </el-submenu>

      <el-menu-item index="2" @click="jump">
        <i class="el-icon-headset"></i>
        <span>首页</span>
      </el-menu-item>

      <el-menu-item index="3" @click="drawer">
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

      <el-menu-item index="6" v-show="flag1" @click="open">
        <i class="el-icon-sort"></i>
        <span>登录/注册</span>
      </el-menu-item>

      <el-submenu index="7" v-show="flag2">
        <template slot="title">
          <i class="el-icon-male"></i>
          <span>你好,{{username}}</span>
        </template>
        <el-menu-item index="7-1" @click="ruin">
          <span>注销账号</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    <!--Element跑马灯的组件-->
    <el-carousel :interval="4000" type="card" :height="bannerH + 'px'">
      <el-carousel-item v-for="(item,index) in bannerList" :key="item.img">
        <h3 class="medium">
          <img :src="item.img" @click="homeGoods(index)" />
        </h3>
      </el-carousel-item>
    </el-carousel>

    <!--自定义搜索框组件 -->
    <el-row>
      <el-col :span="4" :offset="8" class="father">
        <el-input v-model="goodsName" placeholder="请输入商品名" class="Bcolor"></el-input>
        <i class="el-icon-search son"></i>
      </el-col>
      <!--价格选项款-->
      <el-col :span="3">
        <el-select placeholder="请选择价格(可选)" v-model="value" class="special">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <!--go按钮-->
      <el-col :span="2">
        <el-button plain round class="goButton" @click="go">Go</el-button>
      </el-col>
      <!--几成新-->
      <el-col :span="3" :offset="2">
        <div class="block">
          <span class="demonstration">几成新(可选)---{{ goodsQuality }}</span>
          <el-slider class="slider" v-model="goodsQuality" :step="1" :max="10" show-stops></el-slider>
        </div>
      </el-col>
    </el-row>

    <!--标签页-->
    <el-row>
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="first">
          <!--标签页头-->
          <span slot="label">
            <i class="el-icon-monitor"></i> 智能产品区
          </span>

          <!--内容-->
          <el-row>
            <transition-group>
              <el-col :span="4" v-for="(item,index) in displayData" :key="item.id">
                <el-image fit="fill" :src="item.img" @click="aiGoods(index)" />
                <div class="information">
                  <el-row>
                    <el-col :span="24">
                      <a @click.prevent="aiGoods(index)">
                        <span>{{ item.name }}</span>
                      </a>
                      <el-divider direction="vertical"></el-divider>
                      <a @click.prevent="aiGoods(index)">
                        <span>{{ item.price }}</span>
                      </a>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-divider></el-divider>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <a @click.prevent="aiGoods(index)">
                        <span>{{ item.description }}</span>
                      </a>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </transition-group>
          </el-row>

          <el-row>
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[12, 6]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="24"
                background
              ></el-pagination>
            </div>
          </el-row>
        </el-tab-pane>

        <el-tab-pane name="second">
          <span slot="label">
            <i class="el-icon-goods"></i> 潮流服鞋区
          </span>

          <el-row>
            <transition-group>
              <el-col :span="4" v-for="(item,index) in displayData" :key="item.id">
                <el-image fit="fill" :src="item.img" @click="shoeGoods(index)" />
                <div class="information">
                  <el-row>
                    <el-col :span="24">
                      <a @click.prevent="shoeGoods(index)">
                        <span>{{ item.name }}</span>
                      </a>
                      <el-divider direction="vertical"></el-divider>
                      <a @click.prevent="shoeGoods(index)">
                        <span>{{ item.price }}</span>
                      </a>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-divider></el-divider>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <a @click.prevent="shoeGoods(index)">
                        <span>{{ item.description }}</span>
                      </a>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </transition-group>
          </el-row>

          <el-row>
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[12, 6]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="24"
                background
              ></el-pagination>
            </div>
          </el-row>
        </el-tab-pane>

        <el-tab-pane name="third">
          <span slot="label">
            <i class="el-icon-reading"></i> 图书影音区
          </span>

          <el-row>
            <transition-group>
              <el-col :span="4" v-for="(item,index) in displayData" :key="item.id">
                <el-image fit="fill" :src="item.img" @click="bookGoods(index)" />
                <div class="information">
                  <el-row>
                    <el-col :span="24">
                      <a @click.prevent="bookGoods(index)">
                        <span>{{ item.name }}</span>
                      </a>
                      <el-divider direction="vertical"></el-divider>
                      <a @click.prevent="bookGoods(index)">
                        <span>{{ item.price }}</span>
                      </a>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-divider></el-divider>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <a @click.prevent="bookGoods(index)">
                        <span>{{ item.description }}</span>
                      </a>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </transition-group>
          </el-row>

          <el-row>
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[12, 6]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="24"
                background
              ></el-pagination>
            </div>
          </el-row>
        </el-tab-pane>

        <el-tab-pane name="fourth">
          <span slot="label">
            <i class="el-icon-box"></i> 综合乐器区
          </span>

          <el-row>
            <transition-group>
              <el-col :span="4" v-for="(item,index) in displayData" :key="item.id">
                <el-image fit="fill" :src="item.img" @click="musicGoods(index)" />
                <div class="information">
                  <el-row>
                    <el-col :span="24">
                      <a @click.prevent="musicGoods(index)">
                        <span>{{ item.name }}</span>
                      </a>
                      <el-divider direction="vertical"></el-divider>
                      <a @click.prevent="musicGoods(index)">
                        <span>{{ item.price }}</span>
                      </a>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-divider></el-divider>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <a @click.prevent="musicGoods(index)">
                        <span>{{ item.description }}</span>
                      </a>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </transition-group>
          </el-row>

          <el-row>
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[6]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="12"
                background
              ></el-pagination>
            </div>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-row>

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
            <el-input placeholder="请输入会员名" v-model="form.member" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-select v-model="form.sex" placeholder="请选择">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="年龄" :label-width="formLabelWidth">
            <el-input placeholder="年龄" v-model="form.age" autocomplete="off"></el-input>
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
            >{{ loading ? '提交中 ...' : '提交' }}</el-button>
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
                <el-input v-model="form.name" placeholder="请输入姓名" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="form.number" placeholder="请输入11位电话号码" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="邮政编码" :label-width="formLabelWidth">
                <el-input v-model="form.postCode" placeholder="请输入所在6位地区邮政编码" autocomplete="off"></el-input>
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
                >{{ loading ? '提交中 ...' : '提交' }}</el-button>
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
          <button type="button" @click="closeCollect" class="el-drawer__close-btn">
            <i class="el-dialog__close el-icon el-icon-close"></i>
          </button>
        </el-col>
      </div>

      <el-table
        :data="tableData.filter(data => !search1 || data.name.toLowerCase().includes(search1.toLowerCase()))"
        style="width: 100%"
      >
        <el-table-column prop="name" label="商品名" width="120"></el-table-column>
        <el-table-column prop="price" label="价格" width="120"></el-table-column>

        <el-table-column prop="img" width="120" label="图片">
          <!--插入图片链接的代码-->
          <template slot-scope="scope">
            <img :src="scope.row.img" alt style="width: 50px;height: 50px" />
          </template>
        </el-table-column>

        <el-table-column width="137">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search1" size="mini" placeholder="输入商品名搜索" />
          </template>

          <template slot-scope="scope">
            <el-link type="danger" @click="remove(scope.row.name)">移去</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>

    <!--购物车模块-->
    <el-dialog
      title="提示"
      :visible.sync="dialogTableVisible"
      style="height:500px;"
      @close="closeCart"
    >
      <!--这里的slot插槽可以替换title的值,所以加html样式和图标-->
      <div slot="title" style="font-size:23px;">
        <i class="el-icon-shopping-cart-full"></i>
        <span>购物车</span>
      </div>

      <el-table :data="gridData" @selection-change="handleSelectionChange">
        <el-table-column prop="name" label="商品名" width="145"></el-table-column>
        <el-table-column prop="price" label="价格" width="145"></el-table-column>

        <el-table-column prop="img" width="145" label="图片">
          <!--插入图片链接的代码-->
          <template slot-scope="scope">
            <img :src="scope.row.img" alt style="width: 50px;height: 50px" />
          </template>
        </el-table-column>

        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-link type="danger" @click="removeCart(scope.row.name)">移去</el-link>
          </template>
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-col :span="24">
          <el-col :span="4" :offset="16">
            <span>金额:{{total_price}}</span>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-button type="danger" size="small" plain @click="cartPurchase">立即购买</el-button>
          </el-col>
        </el-col>
      </div>
    </el-dialog>

    <!--登录注册模块-->
    <div id="popLayer" v-show="flag"></div>
    <transition name="slide">
      <!--弹出层-->
      <div class="el-message-box" id="popbox" v-show="flag">
        <div class="el-message-box__header">
          <div class="el-message-box__title">
            <span>
              <i class="el-icon-headset"></i>优闲
            </span>
          </div>
          <button type="button" class="el-message-box__headerbtn" @click="close">
            <i class="el-message-box__close el-icon-close"></i>
          </button>
        </div>
        <div class="el-message-box__content">
          <div class="el-message-box__message">
            <p>
              <router-link to="/register">注册</router-link>
              <router-link to="/login">登录</router-link>
              <router-view @success="success(arguments)"></router-view>
            </p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //用户名
      username: "",
      //登录,注册
      flag1: true,
      //注销,账户
      flag2: false,
      //弹框
      flag: false,
      //banner数据
      bannerH: 200,
      bannerList: [],

      //主页图片数据
      allList: [],
      aiList: [],
      shoeList: [],
      bookList: [],
      musicList: [],

      //筛选的数组
      newList: [],

      //默认激活页头组件的第一个模块
      activeIndex: "2",

      //价格的选项值
      options: [
        {
          value: "选项1",
          label: "<500"
        },
        {
          value: "选项2",
          label: "500~1000"
        },
        {
          value: "选项3",
          label: "1000~2000"
        },
        {
          value: "选项4",
          label: "2000~3000"
        },
        {
          value: "选项5",
          label: ">3000"
        }
      ],

      //商品名
      goodsName: "",

      //商品价格
      value: "",

      //几成新的值
      goodsQuality: 0,

      //控制分页的现在页数
      currentPage: 1,
      //控制分页一开始多少条一页;
      pageSize: 12,
      //分页要展示的数组
      displayData: [],

      //激活的卡片
      activeName: "first",

      //抽屉数据(gross)
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
        desc: ""
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

      //搜索的关键词,
      search1: "",

      //购物车数据
      gridData: [],
      dialogTableVisible: false,

      //数目
      cartNumber: null,

      //多选框的值
      multipleSelection: [],

      //watch时用的数据
      total_price: "0￥"
    };
  },

  //created中的函数会在加载时执行
  created() {
    //加载页面

    //判断有没有登录,登陆后刷新还存在此状态
    if (localStorage.getItem("token")) {
      this.flag1 = false;
      this.username = JSON.parse(localStorage.getItem("token")).username;
      this.flag2 = true;
    }

    //拿取后台跑马灯数据
    this.renderBanner();

    //拿取后台主页数据
    this.renderHome();
    setTimeout(() => {
      this.homeSize(this.aiList);
    }, 800);

    //获取收藏夹中的信息
    this.getCollect();

    //获取购物车里的信息
    this.getCart();
  },
  mounted() {
    //图片自适应高度
    this.setBannerH();

    /* 不需要清理localstorage
    window.addEventListener(
      "resize",
      () => {
        this.setBannerH();
      },
      false
    ),
      //监控关闭浏览器事件
      window.addEventListener("beforeunload", e => {
        //清空本地localstorage
        localStorage.clear();
      });
    */
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
    }
  },
  methods: {
    //图片自适应高度
    setBannerH() {
      this.bannerH = document.body.clientWidth / 4;
    },

    // 拿数据渲染轮播图
    renderBanner() {
      this.$http.jsonp("http://localhost:4000/getBanner").then(
        response => {
          console.log(response.body);
          this.bannerList = response.body;
        },
        response => {
          console.log("请求失败");
        }
      );
    },

    //拿数据渲染主页图
    renderHome() {
      this.$http.jsonp("http://localhost:4000/getHome").then(
        response => {
          console.log(response.body);
          this.allList = response.body;
          response.body.forEach((item, index) => {
            if (item.category == "电子产品") {
              this.aiList.push(item);
            }
            if (item.category == "潮流服鞋") {
              this.shoeList.push(item);
            }
            if (item.category == "图书影音") {
              this.bookList.push(item);
            }
            if (item.category == "综合乐器") {
              this.musicList.push(item);
            }
          });
        },
        response => {
          console.log("请求失败");
        }
      );
    },

    //计算当前页面的数据
    homeSize(whichList) {
      this.displayData = [];
      for (
        var j = this.pageSize * (this.currentPage - 1);
        j < this.pageSize * this.currentPage;
        j++
      ) {
        // this.homeList是总数据
        if (whichList[j]) {
          //把数据Push进要渲染的数组
          this.displayData.push(whichList[j]);
        }
      }
    },

    //改变现在的页数时触发(判断是哪个标签页)
    handleCurrentChange(val) {
      if (this.activeName == "first") {
        this.homeSize(this.aiList);
      }
      if (this.activeName == "second") {
        this.homeSize(this.shoeList);
      }
      if (this.activeName == "third") {
        this.homeSize(this.bookList);
      }
      if (this.activeName == "fourth") {
        this.homeSize(this.musicList);
      }
    },

    //改变页面条数时触发(判断是哪个标签页)
    handleSizeChange(val) {
      this.pageSize = `${val}`;
      this.currentPage = 1;
      if (this.activeName == "first") {
        this.homeSize(this.aiList);
      }
      if (this.activeName == "second") {
        this.homeSize(this.shoeList);
      }
      if (this.activeName == "third") {
        this.homeSize(this.bookList);
      }
      if (this.activeName == "fourth") {
        this.homeSize(this.musicList);
      }
    },

    //标签页单击的触发函数
    handleClick(tab, event) {
      if (this.activeName == "first") {
        //换标签时换回原位
        this.currentPage = 1;
        this.pageSize = 12;
        this.homeSize(this.aiList);
      }
      if (this.activeName == "second") {
        /* let obj = {
          category: "潮流服鞋"
        };
        this.$http
          .jsonp("http://localhost:4000/getHome", { params: obj })
          .then(response => {
            console.log(response.body);
            this.homeList = response.body;
          });
        setTimeout(() => {
          this.homeSize();
        }, 600);
        */
        this.currentPage = 1;
        this.pageSize = 12;
        this.homeSize(this.shoeList);
      }
      if (this.activeName == "third") {
        this.currentPage = 1;
        this.pageSize = 12;
        this.homeSize(this.bookList);
      }
      if (this.activeName == "fourth") {
        this.currentPage = 1;
        this.pageSize = 6;
        this.homeSize(this.musicList);
      }
    },

    //跳转主页
    jump() {
      window.location.href = "/";
    },

    //注册登录的显示
    open() {
      //取消滚动条
      this.flag = true;
      document.querySelector("#x").style = "overflow:hidden";
      window.location.href = "/#/login";
    },

    //注册登录的关闭
    close() {
      this.flag = false;
      window.location.href = "/#/";
      document.querySelector("#x").style = "overflow:visible";
    },

    //子通过此方法修改父的值(多参数这么修改)
    success(msg) {
      this.flag1 = msg[0];
      //传入token的name
      this.username = msg[1];
      this.flag2 = msg[2];
    },

    //搜索按钮单击
    go() {
      //取localstorage中的token,判断有没有登录状态,有才能搜索,没有直接跳到登录状态
      this.onLogin(() => {
        //每次重新go的时候,清空
        this.newList = [];

        //商品名(去空格)
        var name = this.goodsName.replace(/\s*/g, "");

        //去大小写敏感
        name = name.toLowerCase();

        //价格
        var price = this.value;
        //质量
        var quality = this.goodsQuality;

        //第一种情况啥都没有提示
        if ((name == "") & (price == "") & (quality == 0)) {
          this.$notify.error({
            title: "提示",
            message: "请输入商品名,价格或几成新",
            type: "warning"
          });
          return;
        }

        //第二种情况(只有商品名,检索商品名和描述)
        if ((name != "") & (price == "") & (quality == 0)) {
          this.allList.forEach((item, index) => {
            if (
              item.name.toLowerCase().indexOf(name) != -1 ||
              item.description.toLowerCase().indexOf(name) != -1
            ) {
              this.newList.push(item);
            }
          });
          console.log(this.newList);
        }
        //第三种情况(只有价格时)
        if ((name == "") & (price != "") & (quality == 0)) {
          this.allList.forEach((item, index) => {
            switch (price) {
              case "选项1":
                //去掉￥判断
                if (item.price.replace("￥", "") <= 500) {
                  this.newList.push(item);
                }
                break;

              case "选项2":
                //去掉￥判断
                if (
                  (500 < item.price.replace("￥", "")) &
                  (item.price.replace("￥", "") <= 1000)
                ) {
                  this.newList.push(item);
                }
                break;

              case "选项3":
                //去掉￥判断
                if (
                  (1000 < item.price.replace("￥", "")) &
                  (item.price.replace("￥", "") <= 2000)
                ) {
                  this.newList.push(item);
                }
                break;

              case "选项4":
                //去掉￥判断
                if (
                  (2000 < item.price.replace("￥", "")) &
                  (item.price.replace("￥", "") <= 3000)
                ) {
                  this.newList.push(item);
                }
                break;

              case "选项5":
                //去掉￥判断
                if (item.price.replace("￥", "") > 3000) {
                  this.newList.push(item);
                }
                break;
            }
          });
          console.log(this.newList);
        }

        //第四种情况(只有几成新时)
        if ((name == "") & (price == "") & (quality != 0)) {
          //成几成新
          var quality1 = quality + "成新";
          this.allList.forEach((item, index) => {
            if (item.description.indexOf(quality1) != -1) {
              this.newList.push(item);
            }
          });
          console.log(this.newList);
        }

        //第五种情况(商品名+价格)
        if ((name != "") & (price != "") & (quality == 0)) {
          this.allList.forEach((item, index) => {
            switch (price) {
              case "选项1":
                //去掉￥判断
                if (
                  (item.price.replace("￥", "") <= 500) &
                  (item.name.toLowerCase().indexOf(name) != -1 ||
                    item.description.toLowerCase().indexOf(name) != -1)
                ) {
                  this.newList.push(item);
                }
                break;
              case "选项2":
                //去掉￥判断
                if (
                  (500 < item.price.replace("￥", "")) &
                  (item.price.replace("￥", "") <= 1000) &
                  (item.name.toLowerCase().indexOf(name) != -1 ||
                    item.description.toLowerCase().indexOf(name) != -1)
                ) {
                  this.newList.push(item);
                }
                break;

              case "选项3":
                //去掉￥判断
                if (
                  (1000 < item.price.replace("￥", "")) &
                  (item.price.replace("￥", "") <= 2000) &
                  (item.name.toLowerCase().indexOf(name) != -1 ||
                    item.description.toLowerCase().indexOf(name) != -1)
                ) {
                  this.newList.push(item);
                }
                break;

              case "选项4":
                console.log("哈哈");
                //去掉￥判断
                if (
                  (2000 < item.price.replace("￥", "")) &
                  (item.price.replace("￥", "") <= 3000) &
                  (item.name.toLowerCase().indexOf(name) != -1 ||
                    item.description.toLowerCase().indexOf(name) != -1)
                ) {
                  this.newList.push(item);
                }
                break;

              case "选项5":
                //去掉￥判断
                if (
                  (item.price.replace("￥", "") > 3000) &
                  (item.name.toLowerCase().indexOf(name) != -1 ||
                    item.description.toLowerCase().indexOf(name) != -1)
                ) {
                  this.newList.push(item);
                }
                break;
            }
          });
          console.log(this.newList);
        }

        //第六种情况(商品名+几成新)
        if ((name != "") & (price == "") & (quality != 0)) {
          var quality1 = quality + "成新";
          this.allList.forEach((item, index) => {
            if (
              (item.name.toLowerCase().indexOf(name) != -1 ||
                item.description.toLowerCase().indexOf(name) != -1) &
              (item.description.indexOf(quality1) != -1)
            ) {
              this.newList.push(item);
            }
          });
          console.log(this.newList);
        }

        //第七种情况(价格+几成新)
        if ((name == "") & (price != "") & (quality != 0)) {
          //几成新
          var quality1 = quality + "成新";

          this.allList.forEach((item, index) => {
            switch (price) {
              case "选项1":
                //去掉￥判断
                if (
                  (item.price.replace("￥", "") <= 500) &
                  (item.description.indexOf(quality) != -1)
                ) {
                  this.newList.push(item);
                }
                break;
              case "选项2":
                //去掉￥判断
                if (
                  (500 < item.price.replace("￥", "")) &
                  (item.price.replace("￥", "") <= 1000) &
                  (item.description.indexOf(quality) != -1)
                ) {
                  this.newList.push(item);
                }
                break;

              case "选项3":
                //去掉￥判断
                if (
                  (1000 < item.price.replace("￥", "")) &
                  (item.price.replace("￥", "") <= 2000) &
                  (item.description.indexOf(quality) != -1)
                ) {
                  this.newList.push(item);
                }
                break;

              case "选项4":
                console.log("哈哈");
                //去掉￥判断
                if (
                  (2000 < item.price.replace("￥", "")) &
                  (item.price.replace("￥", "") <= 3000) &
                  (item.description.indexOf(quality) != -1)
                ) {
                  this.newList.push(item);
                }
                break;

              case "选项5":
                //去掉￥判断
                if (
                  (item.price.replace("￥", "") > 3000) &
                  (item.description.indexOf(quality) != -1)
                ) {
                  this.newList.push(item);
                }
                break;
            }
          });
          console.log(this.newList);
        }

        //第八种情况(商品名+价格+几成新)
        if ((name != "") & (price != "") & (quality != 0)) {
          var quality1 = quality + "成新";
          this.allList.forEach((item, index) => {
            switch (price) {
              case "选项1":
                //去掉￥判断
                if (
                  (item.price.replace("￥", "") <= 500) &
                  (item.name.toLowerCase().indexOf(name) != -1 ||
                    item.description.toLowerCase().indexOf(name) != -1) &
                  (item.description.indexOf(quality1) != -1)
                ) {
                  this.newList.push(item);
                }
                break;
              case "选项2":
                //去掉￥判断
                if (
                  (500 < item.price.replace("￥", "")) &
                  (item.price.replace("￥", "") <= 1000) &
                  (item.name.toLowerCase().indexOf(name) != -1 ||
                    item.description.toLowerCase().indexOf(name) != -1) &
                  (item.description.indexOf(quality1) != -1)
                ) {
                  this.newList.push(item);
                }
                break;

              case "选项3":
                //去掉￥判断
                if (
                  (1000 < item.price.replace("￥", "")) &
                  (item.price.replace("￥", "") <= 2000) &
                  (item.name.toLowerCase().indexOf(name) != -1 ||
                    item.description.toLowerCase().indexOf(name) != -1) &
                  (item.description.indexOf(quality1) != -1)
                ) {
                  this.newList.push(item);
                }
                break;

              case "选项4":
                //去掉￥判断
                if (
                  (2000 < item.price.replace("￥", "")) &
                  (item.price.replace("￥", "") <= 3000) &
                  (item.name.toLowerCase().indexOf(name) != -1 ||
                    item.description.toLowerCase().indexOf(name) != -1) &
                  (item.description.indexOf(quality1) != -1)
                ) {
                  this.newList.push(item);
                }
                break;

              case "选项5":
                //去掉￥判断
                if (
                  (item.price.replace("￥", "") > 3000) &
                  (item.name.toLowerCase().indexOf(name) != -1 ||
                    item.description.toLowerCase().indexOf(name) != -1) &
                  (item.description.indexOf(quality1) != -1)
                ) {
                  this.newList.push(item);
                }
                break;
            }
          });
          console.log(this.newList);
        }

        //把筛选后的数组发送过去(先转为json字符串)
        var newList = JSON.stringify(this.newList);
        //url传值的方式会对url有限制(所以不用这种方式);
        //window.open("./goods.html?val=" + newList);

        //用sessionStorage(每次发送会覆盖前面的值)
        sessionStorage.setItem("search", newList);
        window.open("./goods.html");

        //打开新的页面后把数据还原
        this.goodsName = "";
        this.goodsQuality = 0;
        this.value = "";
      });
    },

    //封装判断登录状态的方法
    onLogin(func) {
      //如果存在localStorage中的token
      if (localStorage.getItem("token")) {
        func();
      } else {
        this.$notify({
          title: "提示",
          message: "你好,请先登录",
          type: "warning"
        });
        this.open();
      }
    },

    //注销账号
    ruin() {
      //清空token
      window.localStorage.clear();
      //刷新页面
      window.location.reload();
    },

    //我的
    drawer() {
      this.onLogin(() => {
        this.getInfo();
        this.dialog = true;
      });
    },

    //我的地址
    myAddress() {
      this.getInnerInfo();
      this.innerDrawer = true;
    },

    //外面抽屉方法(单击提交时)
    handleClose1(done) {
      //去空格
      this.form.member = this.form.member.replace(/\s*/g, "");
      this.form.sex = this.form.sex.replace(/\s*/g, "");
      this.form.age = this.form.age.replace(/\s*/g, "");
      this.form.college = this.form.college.replace(/\s*/g, "");
      if (
        //判断文本框不能为空,为空不能提交
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
        token: token
      };
      this.$http.post("http://localhost:4000/alterInfo", obj).then(
        response => {
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
                  type: "success"
                });
                //去掉提示
                this.flag3 = false;
              }, 400);
            }, 1500);
          }
        },
        response => {
          console.log("请求失败");
        }
      );
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
        token: token
      };
      this.$http.post("http://localhost:4000/alterInnerInfo", obj).then(
        response => {
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
                  position: "bottom-right"
                });
                //去掉提示
                this.flag4 = false;
              }, 400);
            }, 1500);
          }
        },
        response => {
          console.log("请求失败");
        }
      );
    },

    //取消里面的抽屉
    cancelForm2() {
      this.loading = false;
      this.innerDrawer = false;
      this.flag4 = false;
      clearTimeout(this.timer);
    },

    //拿数据渲染外抽屉
    getInfo() {
      if (localStorage.getItem("token")) {
        var obj = {
          username: this.username
        };
        this.$http.get("http://localhost:4000/getInfo", { params: obj }).then(
          response => {
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
          response => {
            console.log("获取失败");
          }
        );
      }
    },

    //拿数据渲染内抽屉
    getInnerInfo() {
      if (localStorage.getItem("token")) {
        var obj = {
          username: this.username
        };
        this.$http
          .get("http://localhost:4000/getInnerInfo", { params: obj })
          .then(
            response => {
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
            response => {
              console.log("获取失败");
            }
          );
      }
    },

    //判断跑马灯是否能够跳转,跳转到详细页面(评论和细节)
    homeGoods(index) {
      this.onLogin(() => {
        console.log(index);
        //组织好点击的数据存到sessionStorage中发送给详细页面
        var obj = {};
        if (index == 0) {
          obj = this.allList[1];
        }
        if (index == 1) {
          obj = this.allList[19];
        }
        if (index == 2) {
          obj = this.allList[6];
        }
        if (index == 3) {
          obj = this.allList[0];
        }
        if (index == 4) {
          obj = this.allList[2];
        }
        if (index == 5) {
          obj = this.allList[22];
        }
        //把数据存到sessionStorage中
        sessionStorage.setItem("detail", JSON.stringify(obj));

        //再跳转到详细的商品页面
        window.open("./detail.html");
      });
    },

    //判断电子产品区goods是否能够跳转,跳转到详细页面(评论和细节)
    aiGoods(index) {
      this.onLogin(() => {
        var index1 = index;

        if ((this.currentPage == 2) & (this.pageSize == 12)) {
          index1 = index1 + 12;
        }
        if ((this.pageSize == 6) & (this.currentPage == 2)) {
          index1 = index1 + 6;
        }
        if ((this.pageSize == 6) & (this.currentPage == 3)) {
          index1 = index1 + 12;
        }
        if ((this.pageSize == 6) & (this.currentPage == 4)) {
          index1 = index1 + 18;
        }
        var obj = this.aiList[index1];
        //把数据存到sessionStorage中
        sessionStorage.setItem("detail", JSON.stringify(obj));

        //再跳转到详细的商品页面
        window.open("./detail.html");
      });
    },

    //判断鞋子区goods是否能够跳转,跳转到详细页面(评论和细节)
    shoeGoods(index) {
      this.onLogin(() => {
        console.log(index);
        var index1 = index;
        if ((this.currentPage == 2) & (this.pageSize == 12)) {
          index1 = index1 + 12;
        }
        if ((this.pageSize == 6) & (this.currentPage == 2)) {
          index1 = index1 + 6;
        }
        if ((this.pageSize == 6) & (this.currentPage == 3)) {
          index1 = index1 + 12;
        }
        if ((this.pageSize == 6) & (this.currentPage == 4)) {
          index1 = index1 + 18;
        }
        var obj = this.shoeList[index1];
        //把数据存到sessionStorage中
        sessionStorage.setItem("detail", JSON.stringify(obj));

        //再跳转到详细的商品页面
        window.open("./detail.html");
      });
    },

    //判断书籍区goods是否能够跳转,跳转到详细页面(评论和细节)
    bookGoods(index) {
      this.onLogin(() => {
        console.log(index);
        var index1 = index;
        if ((this.currentPage == 2) & (this.pageSize == 12)) {
          index1 = index1 + 12;
        }
        if ((this.pageSize == 6) & (this.currentPage == 2)) {
          index1 = index1 + 6;
        }
        if ((this.pageSize == 6) & (this.currentPage == 3)) {
          index1 = index1 + 12;
        }
        if ((this.pageSize == 6) & (this.currentPage == 4)) {
          index1 = index1 + 18;
        }
        var obj = this.bookList[index1];
        //把数据存到sessionStorage中
        sessionStorage.setItem("detail", JSON.stringify(obj));

        //再跳转到详细的商品页面
        window.open("./detail.html");
      });
    },

    //判断乐器区goods是否能够跳转,跳转到详细页面(评论和细节)
    musicGoods(index) {
      this.onLogin(() => {
        console.log(index);
        var index1 = index;
        if (this.currentPage == 2) {
          index1 = index1 + 6;
        }
        var obj = this.musicList[index1];
        //把数据存到sessionStorage中
        sessionStorage.setItem("detail", JSON.stringify(obj));

        //再跳转到详细的商品页面
        window.open("./detail.html");
      });
    },

    //收藏夹模块

    //关闭收藏夹
    closeCollect() {
      this.table = false;
      this.search1 = "";
    },

    //点击收藏夹
    collect() {
      this.onLogin(() => {
        this.table = true;
        this.getCollect();
      });
    },

    //获取收藏夹中的信息;
    getCollect() {
      if (localStorage.getItem("token")) {
        var obj = {
          username: JSON.parse(localStorage.getItem("token")).username
        };
        this.$http
          .get("http://localhost:4000/getCollect", { params: obj })
          .then(
            response => {
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
            reponse => {
              console.log("响应失败");
            }
          );
      }
    },

    //移去收藏夹中的信息
    remove(name) {
      console.log(name);
      //组织当前的信息
      var obj = {
        name: name,
        username: JSON.parse(localStorage.getItem("token")).username
      };
      this.$http
        .get("http://localhost:4000/removeCollect", { params: obj })
        .then(
          response => {
            console.log(response.body);
            if (response.body.flag == 1) {
              //获取最新的个人收藏夹
              this.getCollect();

              //提示移去成功
              this.$notify({
                title: "成功",
                message: "移出成功",
                type: "success"
              });
            }
          },
          response => {
            console.log("响应失败");
          }
        );
    },

    //点击购物车
    cart() {
      this.onLogin(() => {
        this.dialogTableVisible = true;
        this.getCart();
      });
    },

    //关闭购物车
    closeCart() {
      this.total_price = "0￥";
    },

    //查询购物车(查询购物车里的物品);
    getCart() {
      if (localStorage.getItem("token")) {
        var obj = {
          username: JSON.parse(localStorage.getItem("token")).username
        };
        this.$http.get("http://localhost:4000/getCart", { params: obj }).then(
          response => {
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
          reponse => {
            console.log("响应失败");
          }
        );
      }
    },

    //移出购物车
    removeCart(name) {
      //组织当前的信息
      var obj = {
        name: name,
        username: JSON.parse(localStorage.getItem("token")).username
      };
      this.$http.get("http://localhost:4000/removeCart", { params: obj }).then(
        response => {
          console.log(response.body);
          if (response.body.flag == 1) {
            //获取最新的个人收藏夹
            this.getCart();

            //提示移去成功
            this.$notify({
              title: "成功",
              message: "移出成功",
              type: "success"
            });
          }
        },
        response => {
          console.log("响应失败");
        }
      );
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
      if (this.gridData.length == 0) {
        this.$notify.error({
          title: "错误",
          message: "购物车无商品"
        });
        return;
      } else if (this.multipleSelection.length == 0) {
        this.$notify.error({
          title: "错误",
          message: "请先勾选商品,再购买"
        });
      } else {
        this.$http
          .post("http://localhost:4000/deleteCart", {
            //选中的数组;
            list: this.multipleSelection,
            //用户名;
            username: JSON.parse(localStorage.getItem("token")).username
          })
          .then(
            response => {
              console.log(response.body);
              if (response.body.flag == 1) {
                this.$message({
                  message: "恭喜你，购买成功",
                  type: "success"
                });
                //刷新购物车,
                this.getCart();
                //刷新金额
                this.total_price = "0￥";
              } else {
                console.log("删除失败");
              }
            },
            repsonse => {
              console.log("响应失败");
            }
          );
      }
    }
  }
};
</script>

<style lang="less">
/*设置(全局)*/
a {
  text-decoration: none;
  cursor: pointer;
}

img {
  cursor: pointer;
  width: 100%;
  height: 100%;
}

/*标签页*/
.el-menu-item {
  a {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
}
/*elementUI跑马灯样式*/
.el-carousel__item {
  h3 {
    margin: 0px;
  }
}

/*设置放大镜*/
.father {
  position: relative;
  .son {
    font-size: 30px;
    position: absolute;
    left: 0px;
    top: 5px;
  }
}

/*设置输入框*/
.Bcolor {
  .el-input__inner {
    padding-left: 30px;
    font-size: 16px;
  }
}

/*设置输入框和多选框边框*/
.Bcolor,
.special {
  .el-input__inner {
    border-color: rgb(84, 92, 100);
  }
}
.goButton {
  border-color: rgb(84, 92, 100);
}

/*主页下方图片区域块*/
.el-tab-pane {
  .el-row {
    margin-top: 20px;
    .el-col-4 {
      border: 1px dashed rgb(84, 92, 100);
      margin-bottom: 15px;
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
  }
}

/*增加的动画*/
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(30px);
  -webkit-transform: translateY(30px);
  -moz-transform: translateY(30px);
  -ms-transform: translateY(30px);
  -o-transform: translateY(30px);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
}

/*给离开增加的动画*/
.v-move {
  transition: all 1s ease;
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -ms-transition: all 1s ease;
  -o-transition: all 1s ease;
}
.v-leave-active {
  position: absolute;
}

/*设置弹出框的样式*/
.el-message-box {
  .el-message-box__headerbtn {
    font-size: 22px;
  }
  .el-message-box__title {
    font-size: 25px;
    color: #009588;
  }
  .el-message-box__content {
    .el-message-box__message {
      > p {
        text-align: center;
        > div {
          text-align: left;
          margin-top: 5px;
        }
        a {
          color: #b8bcc9;
          font-size: 30px;
          &.router-link-active {
            color: #2f3333;
            border-bottom: 1px dashed #009588;
          }
          &:hover {
            cursor: pointer;
          }
          &:nth-child(1) {
            margin-right: 80px;
          }
        }
      }
    }
  }
}
/*设置背景层的样式*/
#popLayer {
  background-color: #000;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  -moz-opacity: 0.5;
  opacity: 0.5;
  filter: alpha(opacity=50);
  /*只支持IE6、7、8、9*/
  -webkit-filter: alpha(opacity=50);
}
/*设置弹出层*/
#popbox {
  background-color: #ffffff;
  height: 365px;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  z-index: 11;
  -webkit-transition: all 0.2s ease-in; /*加动画*/
  transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  -ms-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
}

/*弹出层动画*/

.slide-enter-active {
  animation-name: slideInUp;
  animation-duration: 0.2s;
  animation-fill-mode: both;
}
.slide-leave-active {
  animation-name: slideOutDown;
  animation-duration: 0.2s;
  animation-fill-mode: both;
}
@keyframes slideInUp {
  0% {
    transform: translate3d(0, 100%, 0);
    visibility: visible;
    -webkit-transform: translate3d(0, 100%, 0);
    -moz-transform: translate3d(0, 100%, 0);
    -ms-transform: translate3d(0, 100%, 0);
    -o-transform: translate3d(0, 100%, 0);
  }

  to {
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    -moz-transform: translateZ(0);
    -ms-transform: translateZ(0);
    -o-transform: translateZ(0);
  }
}
@keyframes slideOutDown {
  0% {
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    -moz-transform: translateZ(0);
    -ms-transform: translateZ(0);
    -o-transform: translateZ(0);
  }

  to {
    visibility: hidden;
    transform: translate3d(0, 100%, 0);
    -webkit-transform: translate3d(0, 100%, 0);
    -moz-transform: translate3d(0, 100%, 0);
    -ms-transform: translate3d(0, 100%, 0);
    -o-transform: translate3d(0, 100%, 0);
  }
}

/*我的按钮*/
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
