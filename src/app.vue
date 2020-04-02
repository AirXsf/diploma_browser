<template>
  <div>
    <!--页头组件-->
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index="1">
        <template slot="title">关于本站</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <a href="#">我的</a>
      </el-menu-item>

      <el-menu-item index="3">
        <a href="#">购物车</a>
      </el-menu-item>
      <el-menu-item index="4">
        <a href="#">登录/注册</a>
      </el-menu-item>
    </el-menu>

    <!--Element跑马灯的组件-->
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>

    <!--自定义搜索框组件 -->
    <el-row>
      <el-col :span="4" :offset="8" class="father">
        <el-input v-model="input" placeholder="请输入商品名" class="Bcolor"></el-input>
        <i class="el-icon-search son"></i>
      </el-col>
      <el-col :span="3">
        <el-select v-model="value1" placeholder="请选择价格(可选)" class="special">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-button plain round class="Bcolor">Go</el-button>
      </el-col>
      <el-col :span="3" :offset="2">
        <div class="block">
          <span class="demonstration">几成新(可选)---{{ value2 }}</span>
          <el-slider class="slider" v-model="value2" :step="1" :max="10" show-stops></el-slider>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
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
      value1: "",
      input: "",
      value2: 0
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
/*elementUI跑马灯样式*/
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

/*设置放大镜*/
.father {
  position: relative;
}
.son {
  font-size: 30px;
  position: absolute;
  left: 0px;
  top: 5px;
}

/*设置输入框*/
.Bcolor >>> .el-input__inner {
  padding-left: 30px;
  font-size: 16px;
}

/*设置输入框和按钮边框*/
.Bcolor,
.Bcolor >>> .el-input__inner {
  border-color: rgb(84, 92, 100);
}

/*设置多选框*/
.special >>> .el-input__inner {
  border-color: rgb(84, 92, 100);
}
</style>
