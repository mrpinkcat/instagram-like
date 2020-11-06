<template>
  <div class='feed'>
    <Navbar></Navbar>
    <div class="post-container">
      <Post
        v-for="post in posts"
        :key="post.id"
        :id="post.id"
        :title="post.title"
        :image="post.image"
        :likes="post.likes"
        :author="post.author"
      />
    </div>
    <transition name="fade">
      <router-view></router-view>
    </transition>
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

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
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
