//引入完整的Vue
import Vue from '../node_modules/vue/dist/vue.js';

//引入app.vue
import app from './app.vue';

//引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

var vm = new Vue({
  el: '#app',
  data: {},
  methods: {},
  render: c => {
    return c(app);
  }
});
