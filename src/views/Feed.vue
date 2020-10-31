<template>
  <div class='feed'>
    <Navbar></Navbar>
    <span v-if="loading > 0">Loading...</span>
    <div class="post-container">
      <Post
        v-for="post in photoPosts"
        :key="post.id"
        :id="post.id"
        :title="post.title"
        :imageUrl="apiUrl + post.image.url"
        :likes="post.likes"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.feed {
  background: white;
  width: 930px;
  height: 100%;

  display: flex;
  flex-direction: row;
  flex-flow: row wrap;

  .post-container {
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
import gql from 'graphql-tag';

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
      photoPosts: [],
    };
  },
  apollo: {
    photoPosts: {
      query: gql`query {
        photoPosts(sort: "published_at:DESC") {
          id
          title
          image {
            url
          }
          published_at
          likes {
            email
          }
        }
      }`,
      loadingKey: 'loading',
    },
  },
};
</script>
