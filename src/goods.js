//引入完整的Vue
// import Vue from '../node_modules/vue/dist/vue.js';

import Vue from 'vue';

//引入goods.vue
import goods from './components/goods.vue';

//引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//导入并安装vue-resource
import vueResource from 'vue-resource';
Vue.use(vueResource);

var vm = new Vue({
  el: '#app',
  data: {},
  methods: {},
  render: (c) => {
    return c(goods);
  },
});
