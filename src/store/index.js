import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import { auth, post } from './modules';

Vue.use(Vuex);

// Active la persistance du store pour éviter de
// se relog à chaque rechargement d'un page
const vuexLocal = new VuexPersistence({
  // Sotckage du store dans le localStorage
  // (peut aussi etre stocker en sessionStorage)
  storage: window.localStorage,
});

export default new Vuex.Store({
  modules: {
    // Gestion de l'autentification de l'utilisateur
    auth,
    // Gestion des posts
    post,
  },
  plugins: [
    // Plugin de persistance
    vuexLocal.plugin,
  ],
});
