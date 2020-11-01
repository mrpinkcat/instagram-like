<template>
  <div class="login" @click="$router.push('/')">
    <!-- @click.stop stop la propagation du click pour
      éviter que le @click du .login soit trigger
      (c.f. https://vuejs.org/v2/guide/events.html#Event-Modifiers)-->
    <div class="modal" @click.stop>
      <span>Login</span>
      <label for="identifier">Identifier</label>
      <input type="text" name="identifier" v-model="identifier">
      <label for="password">Password</label>
      <input type="text" name="password" v-model="password">
      <button class="start-login" @click="login({ identifier, password })">LogIn</button>
      <router-link to="/register">I'm new here</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  background: rgba($color: #000000, $alpha: 0.6);
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 930px;
    padding: 40px;
    background: white;
  }
}
</style>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      identifier: '',
      password: '',
    };
  },
  methods: {
    ...mapActions({ login: 'auth/login' }),
  },
};
</script>
