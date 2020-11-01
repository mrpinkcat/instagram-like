<template>
  <div class='feed'>
    <Navbar></Navbar>
    <span v-if="loading > 0">Loading...</span>
    <div class="post-container">
      <Post
        v-for="post in posts"
        :key="post.id"
        :id="post.id"
        :title="post.title"
        :imageUrl="apiUrl + post.image.url"
        :likes="post.likes"
        :author="post.author"
      />
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
.feed {
  overflow-y: auto;
  background: white;
  width: 930px;
  height: 100%;

  display: flex;
  flex-direction: column;

  .post-container {
    overflow: auto;
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .post {
      flex: 0 0 33.333333%;
    }
  }
}
</style>

<script>
import Navbar from '@/components/Navbar.vue';
import Post from '@/components/Post.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Feed',
  components: {
    Post,
    Navbar,
  },
  data() {
    return {
      apiUrl: process.env.VUE_APP_STRAPI_API_URL,
      loading: 0,
    };
  },
  methods: {
    ...mapActions({ retriveFirstPosts: 'post/retriveFirstPosts' }),
  },
  computed: {
    ...mapGetters({ posts: 'post/posts' }),
  },
  mounted() {
    this.retriveFirstPosts();
  },
};
</script>
