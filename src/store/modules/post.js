import StrapiAPI from '../../axiosInit';

const post = {
  namespaced: true,
  state: {
    /**
     * Posts à afficher dans la feed
     */
    posts: [],
    /**
     * progress bar de l'upload
     */
    uploadProgression: -1,
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
    getUploadProgression(state) {
      return state.uploadProgression;
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
     * Ajoute les posts suivant a la fin du state sans enlever les précedent
     * (utile pour un infinit scroll);
     */
    postsAddition(state, postsArray) {
      state.posts = [...state.posts, ...postsArray];
    },
    /**
     * Ajoute les posts suivant au début du state sans enlever les suivant
     * (utile pour ne pas à avoir à refresh la page lors d'un nouveau post);
     */
    postsCreation(state, postsArray) {
      state.posts = [...postsArray, ...state.posts];
    },
    // addLike(state, { postId, likeAuthor }) {
    // },
    changeUploadProgression(state, progression) {
      state.uploadProgression = progression;
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
            _sort: 'created_at:desc',
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
            _sort: 'created_at:desc',
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
     * Envoyer un nouveau post à strapi
     * @param {{ title, description, imageBlob }} postInfo
     */
    sendPost({ commit, rootGetters }, { title, description, imageBlob }) {
      return new Promise((resolve, reject) => {
        if (rootGetters['auth/isAuthenticated']) {
          // Création du form data, plus simple pour upload
          // des images et créer une entry en meme temps
          const data = new FormData();
          // ajout de l'image au form data
          data.append('files.image', imageBlob, 'zeubi');
          // ajout de la data au from data (titre description etc);
          data.append('data', JSON.stringify({
            title,
            description,
            author: rootGetters['auth/getUserInfo'].id,
          }));

          StrapiAPI
            .post('/photo-posts', data, {
              headers: {
                Authorization: `Bearer ${rootGetters['auth/getJwt']}`,
              },
              // Progression de l'upload
              onUploadProgress(progressEvent) {
                commit('changeUploadProgression', Math.round((progressEvent.loaded * 100) / progressEvent.total));
              },
            })
            .then((res) => {
              console.log('Post uploaded succesfully!');
              console.dir(res);
              commit('postsCreation', [res.data]);
              resolve(res.data);
              commit('changeUploadProgression', -1);
            })
            .catch((err) => {
              console.log('An error occurred while posting a new post:');
              console.dir(err);
              reject(new Error('An error occurred while posting a new post'));
              commit('changeUploadProgression', -1);
            });
        } else {
          reject(new Error('You are not authenticated !'));
        }
      });
    },
    likePost({ rootGetters }, postId) {
      return new Promise((resolve, reject) => {
        // Check si l'utilisateur est connectecté
        if (rootGetters['auth/isAuthenticated']) {
          StrapiAPI
            .put(`/photo-posts/${postId}`, {
              // Ajoute son like
              likes: [rootGetters['auth/getUserInfo'].id],
            },
            {
              headers: {
                Authorization: `Bearer ${rootGetters['auth/getJwt']}`,
              },
            })
            .then(() => {
              resolve();
            })
            .catch(() => {
              reject();
            });
        } else {
          reject(new Error({ message: 'You are not authenticated !' }));
        }
      });
    },
  },
};

export default post;
