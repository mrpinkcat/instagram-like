<template>
  <div class="register" @click="$router.push('/')">
    <!-- @click.stop stop la propagation du click pour
      éviter que le @click du .register soit trigger
      (c.f. https://vuejs.org/v2/guide/events.html#Event-Modifiers)-->
    <div class="modal" @click.stop>
      <span>Register</span>
      <label for="username">Username</label>
      <input type="text" name="username" v-model="username">
      <label for="email">Email</label>
      <input type="text" name="email" v-model="email">
      <label for="password">Password</label>
      <input type="text" name="password" v-model="password">
      <button
        class="start-register"
        @click="register({ username, email, password })">
          Register
      </button>
      <router-link to="/login">I allready have an account</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.register {
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
      username: '',
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapActions({ register: 'auth/register' }),
  },
};
</script>
