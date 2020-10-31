import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Feed from '../views/Feed.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Feed,
    beforeEnter: (to, from, next) => {
      if (store.getters.logged) {
        next();
      } else {
        next('/connection');
      }
    },
  },
  {
    path: '/connection',
    name: 'Connection',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (!store.getters.logged) {
        next();
      } else {
        next('/');
      }
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
