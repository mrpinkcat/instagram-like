<template>
  <div class="login" @click="$router.push('/')">
    <!-- @click.stop stop la propagation du click pour
      éviter que le @click du .login soit trigger
      (c.f. https://vuejs.org/v2/guide/events.html#Event-Modifiers)-->
    <div class="modal" @click.stop>
      <span class="credit">
        Photo: <a href="https://unsplash.com/@krizgonzalez">Kristian Gonzalez</a>
      </span>
      <VLazyImage
        class="media"
        :src="apiUrl + imageUrl"
        :src-placeholder="apiUrl + imagePlaceholder"/>
      <div class="container">
        <h2>Login</h2>
        <form class="form">
          <span class="error" v-if="error">{{error}}</span>
          <label for="identifier">
            Username / Email:
          </label>
          <input
            ref="identifier"
            type="text"
            name="identifier"
            id="identifier"
            placeholder="elon.musk@tesla.com"
            autocomplete="email"
            v-model="identifier">
          <label for="password">
            Password:
          </label>
          <input
            ref="password"
            type="password"
            name="password"
            id="password"
            autocomplete="current-password"
            v-model="password"
            @keyup.enter.stop="loginClick()">
          <v-button type="button" class="center big" @click="loginClick()">
            Login
          </v-button>
          <!-- <v-button class="center underline">
            I have forgot my password
          </v-button> -->
        </form>
          <v-button class="center underline" @click="$router.push('/register')">
            I didn't have an account
          </v-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  z-index: 10;
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
    position: relative;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    width: 930px;
    background: white;
    overflow: hidden;

    .credit {
      position: absolute;
      bottom: 15px;
      right: calc(50% + 15px);
      color: white;
      z-index: 11;

      a {
        color: white;
      }
    }

    img {
      width: 50%;
    }

    .v-lazy-image {
      filter: blur(5px);
      transition: all .7s ease;
      transform: scale(1.07);
    }
    .v-lazy-image-loaded {
      filter: blur(0);
      transform: scale(1);
    }

    .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-sizing: border-box;
      padding: 20px;
      width: 50%;

      h2 {
        margin: 0;
        margin-bottom: 20px;
      }

      .form {
        position: relative;
        display: flex;
        flex-direction: column;

        .error {
          position: absolute;
          top: -45px;
          right: 0;
          font-size: 14px;
          font-weight: 500;
          color: red;
        }

        label {
          font-weight: 500;
        }

        input {
          font-family: Avenir, Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          padding: 10px;
          border-radius: 0;
          border: 1px solid black;
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>

<script>
import VLazyImage from 'v-lazy-image';
import { mapActions } from 'vuex';
import Button from '@/components/Button.vue';

export default {
  name: 'Login',
  components: {
    'v-button': Button,
    VLazyImage,
  },
  data() {
    return {
      error: undefined,
      identifier: '',
      password: '',
      apiUrl: process.env.VUE_APP_STRAPI_API_URL,
      imageUrl: '/uploads/kristian_gonzalez_ju_pmnw_Wy_HY_unsplash_769ddbb7bd.jpg',
      imagePlaceholder: '/uploads/thumbnail_kristian_gonzalez_ju_pmnw_Wy_HY_unsplash_769ddbb7bd.jpg',
    };
  },
  methods: {
    ...mapActions({ login: 'auth/login' }),
    loginClick() {
      this.error = false;
      this.login({ identifier: this.identifier, password: this.password })
        .then(() => {
          this.$router.push('/');
        })
        .catch((errorMessage) => {
          this.error = errorMessage;
          this.password = '';
        });
    },
  },
  mounted() {
    this.$refs.identifier.focus();
  },
};
</script>
