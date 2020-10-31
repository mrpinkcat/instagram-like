<template>
  <div class="post">
    <span class="title">{{title}}</span>
    <div class="likes" @click="likeClick">
      <span class="heart-number">{{likes.length}}</span>
      <img src="../assets/heart.svg" />
    </div>
    <img class="media" :src="imageUrl" :alt="title">
  </div>
</template>

<style lang="scss" scoped>
.post {
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
  }

  position: relative;
  transition: all .2s ease;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  border: 10px white solid;

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
    background: white;
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
    background: white;
    transition: all .2s ease;

    img {
      margin-left: 8px;
      height: 30px;
    }
  }
}
</style>

<script>
export default {
  props: {
    id: undefined,
    title: undefined,
    imageUrl: undefined,
    likes: undefined,
    author: undefined,
  },
  methods: {
    likeClick() {
      console.log('Like !');
    },
  },
};
</script>
