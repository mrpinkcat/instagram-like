import Vue from 'vue';
import VueRouter from 'vue-router';
// import store from '../store';
import Feed from '../views/Feed.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import NewPost from '../components/NewPost.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Feed,
    children: [
      {
        path: 'login',
        component: Login,
      },
      {
        path: 'register',
        component: Register,
      },
      {
        path: 'new-post',
        component: NewPost,
        // beforeEnter: (to, from, next) => {
        //   if (!store.getters['auth/isAuthenticated']) {
        //     next('/login?redirect=/new-post');
        //   } else {
        //     next();
        //   }
        // },
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
