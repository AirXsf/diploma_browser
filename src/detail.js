// import Vue from '../node_modules/vue/dist/vue.js';

import Vue from 'vue';

//引入detail.vue
import detail from './components/detail.vue';

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
    return c(detail);
  },
});
