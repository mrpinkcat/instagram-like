import StrapiAPI from '../../axiosInit';

const post = {
  namespaced: true,
  state: {
    /**
     * Posts à afficher dans la feed
     */
    posts: [],
  },
  getters: {
    posts(state) {
      return state.posts;
    },
    /**
     * Retoune le nombre de post chargés
     */
    postsLength(state) {
      return state.posts.length;
    },
  },
  mutations: {
    /**
     * Redéfini le state des posts
     */
    postsPopulate(state, postsArray) {
      state.posts = postsArray;
    },
    /**
     * Ajoute les posts suivant au state sans enlever les précedent
     * (utile pour un infinit scroll);
     */
    postsAddition(state, postsArray) {
      state.posts = [...state.posts, ...postsArray];
    },
  },
  actions: {
    /**
     * Récupère les 30 premiers posts
     */
    retriveFirstPosts({ commit }) {
      StrapiAPI
        .get('/photo-posts', {
          params: {
            _limit: 30,
            _sort: 'published_at:desc',
          },
        })
        .then((res) => {
          commit('postsPopulate', res.data);
        })
        .catch((err) => {
          // Handle error.
          console.log('An error occurred while retriving posts:', err.response.data);
        });
    },
    /**
     * Récupère les posts suivant en fonction du nombre de posts déjà chargé dans le store
     */
    retriveNextPosts({ commit, getters }) {
      StrapiAPI
        .get('/photo-posts', {
          params: {
            _start: getters.postsLength,
            _limit: 30,
            _sort: 'published_at:desc',
          },
        })
        .then((res) => {
          commit('postsPopulate', res.data);
        })
        .catch((err) => {
          // Handle error.
          console.log('An error occurred while retriving posts:', err.response.data);
        });
    },
  },
};

export default post;