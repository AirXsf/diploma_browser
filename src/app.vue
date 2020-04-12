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

      <el-menu-item index="2" @click="jump">首页</el-menu-item>

      <el-menu-item index="3" @click="dialog = true">我的</el-menu-item>

      <el-menu-item index="4" @click="table = true">购物车</el-menu-item>
      <el-menu-item index="5" @click="open">登录/注册</el-menu-item>
    </el-menu>
    <!--Element跑马灯的组件-->
    <el-carousel :interval="4000" type="card" :height="bannerH + 'px'">
      <el-carousel-item v-for="item in bannerList" :key="item.img">
        <h3 class="medium">
          <el-link :href="item.img_href">
            <el-image :src="item.img" fit="fill"></el-image>
          </el-link>
        </h3>
      </el-carousel-item>
    </el-carousel>

    <!--自定义搜索框组件 -->
    <el-row>
      <el-col :span="4" :offset="8" class="father">
        <el-input
          v-model="goodsName"
          placeholder="请输入商品名"
          class="Bcolor"
        ></el-input>
        <i class="el-icon-search son"></i>
      </el-col>
      <!--价格选项款-->
      <el-col :span="3">
        <el-select
          v-model="goodsPrice"
          placeholder="请选择价格(可选)"
          class="special"
        >
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
        <el-button plain round class="goButton">Go</el-button>
      </el-col>
      <!--几成新-->
      <el-col :span="3" :offset="2">
        <div class="block">
          <span class="demonstration">几成新(可选)---{{ quality }}</span>
          <el-slider
            class="slider"
            v-model="quality"
            :step="1"
            :max="10"
            show-stops
          ></el-slider>
        </div>
      </el-col>
    </el-row>

    <!--卡片-->
    <el-row>
      <el-tabs type="border-card">
        <el-tab-pane>
          <!--标签页-->
          <span slot="label"> <i class="el-icon-monitor"></i> 智能产品区 </span>

          <!--内容-->
          <el-row>
            <transition-group>
              <el-col :span="6" v-for="item in displayData" :key="item.id">
                <div>
                  <el-image fit="fill" :src="item.img"></el-image>
                  <div class="information">
                    <el-col :span="24">
                      <span>{{ item.name }}</span>
                      <el-divider direction="vertical"></el-divider>
                      <span>{{ item.price }}</span>
                    </el-col>
                    <el-col :span="24">
                      <el-divider></el-divider>
                    </el-col>
                    <el-col :span="24">
                      <span>{{ item.description }}</span>
                    </el-col>
                  </div>
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
                :page-sizes="[8, 4]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="24"
                background
              ></el-pagination>
            </div>
          </el-row>
        </el-tab-pane>

        <el-tab-pane>
          <span slot="label"> <i class="el-icon-goods"></i> 潮流服鞋区 </span>

          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light"></div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light"></div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light"></div>
            </el-col>
          </el-row>

          <el-row>
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                layout="prev, pager, next, jumper"
                :total="30"
              ></el-pagination>
            </div>
          </el-row>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"> <i class="el-icon-reading"></i> 图书影音区 </span>

          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light"></div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light"></div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light"></div>
            </el-col>
          </el-row>

          <el-row>
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                layout="prev, pager, next, jumper"
                :total="30"
              ></el-pagination>
            </div>
          </el-row>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"> <i class="el-icon-box"></i> 生活物品区 </span>

          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light"></div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light"></div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light"></div>
            </el-col>
          </el-row>

          <el-row>
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                layout="prev, pager, next, jumper"
                :total="30"
              ></el-pagination>
            </div>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-row>

    <!--抽屉左模块 -->
    <el-drawer
      title="我嵌套了 Form !"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="ltr"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button
            type="primary"
            @click="$refs.drawer.closeDrawer()"
            :loading="loading"
            >{{ loading ? '提交中 ...' : '确 定' }}</el-button
          >
        </div>
      </div>
    </el-drawer>

    <!--抽屉右模块 -->
    <el-drawer
      title="我嵌套了表格!"
      :visible.sync="table"
      direction="rtl"
      size="50%"
    >
      <el-table :data="gridData">
        <el-table-column
          property="date"
          label="日期"
          width="150"
        ></el-table-column>
        <el-table-column
          property="name"
          label="姓名"
          width="200"
        ></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //banner数据
      bannerH: 200,
      bannerList: [],

      //主页图片数据
      homeList: [],

      //默认激活页头组件的第一个模块
      activeIndex: '2',

      //价格的选项值
      options: [
        {
          value: '选项1',
          label: '<500'
        },
        {
          value: '选项2',
          label: '500~1000'
        },
        {
          value: '选项3',
          label: '1000~2000'
        },
        {
          value: '选项4',
          label: '2000~3000'
        },
        {
          value: '选项5',
          label: '>3000'
        }
      ],
      //商品名
      goodsName: '',
      //商品价格
      goodsPrice: '',
      //几成新的值
      quality: 0,

      //控制分页的现在页数
      currentPage: 1,
      //控制分页的每页多少条;
      pageSize: 8,
      //分页要展示的数组
      displayData: [],

      //抽屉数据
      table: false,
      dialog: false,
      loading: false,
      //抽屉表格值
      gridData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      //抽屉表单中数据
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '80px',
      timer: null
    };
  },
  created() {
    //拿取后台跑马灯数据
    this.renderBanner();
    //拿取后台主页数据
    this.renderHome();
    setTimeout(() => {
      this.homeSize();
    }, 500);
  },
  mounted() {
    //图片自适应高度
    this.setBannerH();
    window.addEventListener(
      'resize',
      () => {
        this.setBannerH();
      },
      false
    );
  },
  methods: {
    //图片自适应高度
    setBannerH() {
      this.bannerH = document.body.clientWidth / 4;
    },

    // 拿数据渲染轮播图
    renderBanner() {
      this.$http.jsonp('http://localhost:4000/getBanner').then(
        response => {
          console.log(response.body);
          this.bannerList = response.body;
        },
        response => {
          console.log('请求失败');
        }
      );
    },

    //拿数据渲染主页图
    renderHome() {
      let obj = {
        category: '电子产品'
      };
      this.$http
        .jsonp('http://localhost:4000/getHome', { params: obj })
        .then(response => {
          console.log(response.body);
          this.homeList = response.body;
          console.log('哈哈');
        });
    },

    //计算当前页面的数据
    homeSize() {
      console.log('嘿嘿');
      for (
        var j = this.pageSize * (this.currentPage - 1);
        j < this.pageSize * this.currentPage;
        j++
      ) {
        // this.homeList是总数据
        if (this.homeList[j]) {
          //把数据Push进要渲染的数组
          this.displayData.push(this.homeList[j]);
        }
      }
    },

    //改变现在的页数时触发
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      //改变现在的页数时要清空原先的旧数组
      this.displayData = [];
      this.homeSize();
    },

    //页面条数调整触发
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = `${val}`;
      //改变现在的页数时要清空原先的旧数组
      this.displayData = [];
      this.homeSize();
    },

    //跳转页面
    jump() {
      window.location.href = '/';
    },

    //注册登录
    open() {
      this.$prompt('请输入用户名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '邮箱格式不正确'
      })
        .then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
    },

    //抽屉方法
    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true;
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
            }, 400);
          }, 2000);
        })
        .catch(_ => {});
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    }
  }
};
</script>

<style lang="less">
/*设置a标签(全局)*/
a {
  text-decoration: none;
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
.el-row {
  margin-top: 20px;
  &:last-child {
    margin-bottom: 0;
  }
  .el-col-6 {
    border-left: 2px dashed rgb(84, 92, 100);
    border-top: 2px dashed rgb(84, 92, 100);
    border-bottom: 2px dashed rgb(84, 92, 100);
    text-align: center;
    margin-bottom: 10px;
    &:last-child {
      border-right: 2px dashed rgb(84, 92, 100);
    }
    .information {
      .el-divider--horizontal {
        margin: 12px 0;
      }
      .el-divider--vertical {
        width: 1px;
        background-color: black;
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

.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
