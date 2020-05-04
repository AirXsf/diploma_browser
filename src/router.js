import vueRouter from 'vue-router';

import app from './app.vue';

import login from './components/login.vue';

import register from './components/register.vue';

var router = new vueRouter({
  routes: [
    {
      path: '/login',
      component: login,
    },
    {
      path: '/register',
      component: register,
    },
    ,
  ],
});

export default router;
