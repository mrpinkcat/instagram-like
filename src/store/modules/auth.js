import StrapiAPI from '../../axiosInit';

const auth = {
  namespaced: true,
  state: {
    id: undefined,
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
    /**
     * Le nom complet de l'utilisateur
     */
    fullName: undefined,
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
    getUsername(state) {
      return state.username;
    },
    getFullName(state) {
      return state.fullName;
    },
    getUserInfo(state) {
      return {
        id: state.id,
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
    setUserInfo(state, {
      id,
      username,
      email,
      fullName,
    }) {
      state.id = id;
      state.username = username;
      state.email = email;
      state.fullName = fullName;
    },
    removeUserInfo(state) {
      state.fullName = undefined;
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
      return new Promise((resolve, reject) => {
        StrapiAPI
          .post('/auth/local', {
            identifier: credentials.identifier,
            password: credentials.password,
          })
          // Si l'auth réussi
          .then((res) => {
            commit('setJwt', res.data.jwt);
            commit('setUserInfo', {
              id: res.data.user.id,
              username: res.data.user.username,
              email: res.data.user.email,
              fullName: res.data.user.fullName,
            });
            resolve();
          })
          // Si l'auth échoue
          .catch((err) => {
            // Handle error.
            console.error('An error occurred while login');
            reject(err.response.data.data[0].messages[0].message);
          });
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
          fullName: userInfo.fullName,
        })
        // Si le register réussi
        .then((res) => {
          commit('setJwt', res.data.jwt);
          commit('setUserInfo', {
            username: res.data.user.username,
            email: res.data.user.email,
            fullName: res.data.user.fullName,
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

export default auth;
