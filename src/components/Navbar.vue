<template>
  <div class="navbar">
    <span class="brand">SquarePics</span>
    <v-button class="big" @click="$router.push('/new-post')" v-if="isAuthenticated">
      Share a square <upload-icon />
    </v-button>
    <div class="user" v-if="isAuthenticated">
      <span class="user-name">{{getFullName}}</span>
      <v-button @click="logout()">Logout</v-button>
    </div>
    <v-button class="disconnected" v-else @click="$router.push('/login')">
      Login / Signup
    </v-button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Button from '@/components/Button.vue';
import UploadIcon from '@/components/UploadIcon.vue';

export default {
  name: 'Navbar',
  components: {
    'v-button': Button,
    'upload-icon': UploadIcon,
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      getFullName: 'auth/getFullName',
    }),
  },
  methods: {
    ...mapActions({ logout: 'auth/logout' }),
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
  min-height: 65px;
  width: 100%;
  padding: 10px 25px;

  .brand {
    position: absolute;
    left: 25px;
    font-size: 25px;
    font-weight: bold;
  }

  .user, .disconnected {
    position: absolute;
    right: 25px;
  }

  .user {
    display: flex;
    align-items: center;

    .user-name {
      margin-right: 15px;
    }
  }
}
</style>
