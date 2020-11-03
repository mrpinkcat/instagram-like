import Vue from 'vue';
import VueCroppie from 'vue-croppie';
import App from './App.vue';
import router from './router';
import store from './store';
import './reset.css';
import 'croppie/croppie.css'; // import the croppie css manually

Vue.use(VueCroppie);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
