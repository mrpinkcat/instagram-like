import StrapiAPI from '../../axiosInit';

const authModule = {
  state: {
    /**
     * Nom d'utilisateur
     */
    username: undefined,
    /**
     * Email de l'utilisateur
     */
    email: undefined,
    /**
     * Url de la photo de profil de l'utilisateur
     */
    avatarUrl: undefined,
    /**
     * Le JSON web token fourni par strapi
     */
    jwt: undefined,
  },
  getters: {
    isAuthenticated(state) {
      if (state.jwt) {
        return true;
      }
      return false;
    },
    getJwt(state) {
      return state.jwt;
    },
    getUserInfo(state) {
      return {
        username: state.username,
        email: state.email,
        avatarUrl: state.avatarUrl,
      };
    },
  },
  mutations: {
    setJwt(state, jwt) {
      state.jwt = jwt;
    },
    setUserInfo(state, { username, email }) {
      state.username = username;
      state.email = email;
    },
    removeUserInfo(state) {
      state.username = undefined;
      state.email = undefined;
      state.avatarUrl = undefined;
      state.jwt = undefined;
    },
  },
  actions: {
    /**
     * Authentification de l'utilisateur chez strapi
     * @param {{identifier: string, password: string}} credentials
     */
    login({ commit }, credentials) {
      StrapiAPI
        .post('/auth/local', {
          identifier: credentials.identifier,
          password: credentials.password,
        })
        // Si l'auth réussi
        .then((res) => {
          commit('setJwt', res.data.jwt);
          commit('setUserInfo', {
            username: res.data.user.username,
            email: res.data.user.email,
          });
        })
        // Si l'auth échoue
        .catch((err) => {
          // Handle error.
          console.log('An error occurred while loggin:', err.response.data);
        });
    },

    /**
     * Création d'un utilisateur chez strapi
     * @param {{username: string, email: string, password: string}} userInfo
     */
    register({ commit }, userInfo) {
      StrapiAPI
        .post('/auth/local/register', {
          username: userInfo.username,
          email: userInfo.email,
          password: userInfo.password,
        })
        // Si le register réussi
        .then((res) => {
          commit('setJwt', res.data.jwt);
          commit('setUserInfo', {
            username: res.data.user.username,
            email: res.data.user.email,
          });
        })
        // Si le register échoue
        .catch((err) => {
          // Handle error.
          console.log('An error occurred while register:', err.response.data);
        });
    },

    /**
     * Déconnection front end
     */
    logout({ commit }) {
      commit('removeUserInfo');
    },
  },
};

export default authModule;
