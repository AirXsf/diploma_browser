//引入完整的Vue
// import Vue from '../node_modules/vue/dist/vue.js';
import Vue from 'vue';

//引入app.vue
import app from './app.vue';

//引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//导入并安装路由
import vueRouter from 'vue-router';
Vue.use(vueRouter);

//导入并安装vue-resource
import vueResource from 'vue-resource';
Vue.use(vueResource);

//1.2 引入封装的路由模块
import router from './router.js';

var vm = new Vue({
  el: '#app',
  data: {},
  methods: {},
  render: (c) => {
    return c(app);
  },
  router,
});
