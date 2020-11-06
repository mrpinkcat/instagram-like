<template>
  <div class="post">
    <span class="title">{{title}}</span>
    <div class="likes" @click="likeClick">
      <span class="heart-number">{{likes.length}}</span>
      <img
        v-if="likes.find(like => like.username === getUsername)"
        src="../assets/heart-filled.svg"
      />
      <img v-else src="../assets/heart.svg" />
    </div>
    <div class="author" v-if="author">
      <img v-if="author.avatar" :src="apiUrl + author.avatar.url">
      <span>{{author.fullName}}</span>
    </div>
    <VLazyImage
      v-if="image.formats"
      class="media"
      :alt="title"
      :src="apiUrl + image.url"
      :src-placeholder="apiUrl + image.formats.thumbnail.url"/>
    <VLazyImage
      v-else
      class="media"
      :alt="title"
      :src="apiUrl + image.url"/>
  </div>
</template>

<style lang="scss" scoped>
.post {
  position: relative;
  transition: all .2s ease;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  border: 10px white solid;

  &:hover {
    border: 13px white solid;

    .media {
      transform: scale(1.1);
    }

    .title {
      top: 15px;
      left: 15px;
    }

    .likes {
      top: 15px;
      right: 15px;
    }

    .author {
      bottom: 15px;
      left: 15px;
    }
  }

  .media {
    width: 100%;
    height: 100%;
    transform: scale(1);
    transition: all .2s ease;
  }

  .title {
    max-width: 150px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    z-index: 1;
    font-weight: bold;
    position: absolute;
    top: -60px;
    left: -20px;
    padding: 10px;
    background: rgba($color: #FFF, $alpha: .85);
    transition: all .2s ease;
  }

  .likes {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0 10px;
    height: 42px;
    z-index: 1;
    position: absolute;
    top: -60px;
    right: -20px;
    background: rgba($color: #FFF, $alpha: .85);
    transition: all .2s ease;

    img {
      margin-left: 8px;
      height: 30px;
    }
  }

  .author {
    height: 42px;
    display: flex;
    align-items: center;
    position: absolute;
    bottom: -60px;
    left: -20px;
    z-index: 1;
    background: rgba($color: #FFF, $alpha: .85);
    transition: all .2s ease;

    img {
      width: 42px;
      height: 42px;
    }

    span {
      padding: 0 10px;
    }
  }

  .v-lazy-image {
    filter: blur(5px);
    transition: filter .7s ease;
  }
  .v-lazy-image-loaded {
    filter: blur(0);
  }
}
</style>

<script>
import VLazyImage from 'v-lazy-image';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Post',
  components: {
    VLazyImage,
  },
  data() {
    return {
      apiUrl: process.env.VUE_APP_STRAPI_API_URL,
    };
  },
  props: {
    id: undefined,
    title: undefined,
    image: undefined,
    likes: undefined,
    author: undefined,
  },
  computed: {
    ...mapGetters({ getUsername: 'auth/getUsername' }),
  },
  methods: {
    ...mapActions({ likePost: 'post/likePost' }),

    likeClick() {
      this.likePost(this.id);
    },
  },
};
</script>
