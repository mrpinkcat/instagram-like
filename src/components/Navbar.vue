<template>
  <div class="navbar">
    <span class="brand">SquarePics</span>
    <button class="upload">
      Share a square
    </button>
    <div class="user" v-if="isAuthenticated">
      <span class="user-name">{{getUsername}}</span>
    </div>
    <button
      class="disconnected"
      v-if="!isAuthenticated"
      @click="$router.push('/login')">
        Login / Signup
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      getUsername: 'auth/getUsername',
    }),
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  box-sizing: border-box;
  position: relative;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 100%;
  padding: 0 25px;

  .brand {
    position: absolute;
    left: 25px;
    font-size: 25px;
    font-weight: bold;
  }

  .disconnected {
    all: unset;
    display: flex;
    align-items: center;
    border: 1px black solid;
    padding: 0 15px;
    height: 30px;
    cursor: pointer;
    background: white;
    font-weight: 500;
    transition: all .2s ease;

    &:hover {
      background: black;
      color: white;
    }
  }

  .user, .disconnected {
    position: absolute;
    right: 25px;
  }

  .upload {
    all: unset;
    display: flex;
    align-items: center;
    border: 1px black solid;
    padding: 0 25px;
    height: 40px;
    cursor: pointer;
    background: white;
    font-weight: 500;
    font-size: 18px;
    transition: all .2s ease;

    &:hover {
      background: black;
      color: white;
    }
  }
}
</style>
