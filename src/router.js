/*
 * @Date: 2020-04-02 20:39:24
 * @LastEditors: wangbiao_isf_ah
 * @Description: 路由配置
 * @LastEditTime: 2021-04-01 10:26:25
 */
import vueRouter from 'vue-router';

import app from './app.vue';

import login from './components/login.vue';

import register from './components/register.vue';

import forgetPw from './components/forgetPw.vue';

var router = new vueRouter({
  routes: [
    {
      path: '/login',
      component: login,
      name: 'login',
    },
    {
      path: '/register',
      component: register,
    },
    {
      path: '/forgetPw',
      component: forgetPw,
    },
  ],
});

export default router;
