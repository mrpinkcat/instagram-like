<template>
  <div class="navbar">
    <span class="brand">SquarePics</span>
    <router-link tag="button" class="upload" to="/new-post">
      Share a square
      <!-- eslint-disable -->
      <svg version="1.1" id="upload-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 488.006 488.006" style="enable-background:new 0 0 488.006 488.006;" xml:space="preserve">
        <g>
          <path d="M460.003,319.398c-4.418,0-8,3.582-8,8v144.608h-416V327.398c0-4.418-3.582-8-8-8s-8,3.582-8,8v152.608
            c0,4.418,3.582,8,8,8h432c4.418,0,8-3.582,8-8V327.398C468.003,322.98,464.421,319.398,460.003,319.398z"/>
          <path d="M145.446,117.859c0.067-0.064,0.132-0.13,0.197-0.197l90.36-90.344v372.688c0,4.418,3.582,8,8,8s8-3.582,8-8V27.318
            l90.344,90.344c3.178,3.07,8.242,2.982,11.312-0.196c2.995-3.1,2.995-8.016,0-11.116l-104-104
            c-3.12-3.128-8.186-3.135-11.314-0.014c-0.005,0.005-0.01,0.01-0.014,0.014l-104,104c-3.178,3.069-3.266,8.134-0.197,11.312
            C137.204,120.84,142.268,120.928,145.446,117.859z"/>
        </g>
      </svg>
      <!-- eslint-enable -->
    </router-link>
    <div class="user" v-if="isAuthenticated">
      <span class="user-name">{{getUsername}}</span>
    </div>
    <router-link tag="button" class="disconnected" v-if="!isAuthenticated" to="/login">
      Login / Signup
    </router-link>
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

      #upload-icon {
        fill: white;
      }
    }

    #upload-icon {
      height: 60%;
      padding-left: 10px;
      transition: all .2s ease;
    }
  }
}
</style>
