<template>
  <header>
    <div class="info-block">
      <h1 @click="onHome" class="header1">The Great Shortener</h1>
      <p class="subtitle1-lower-opacity">
        Create a shortened link making it easy to remember.
      </p>
    </div>
    <img
      alt="The great shortener logo"
      class="logo-block"
      :src="unlinkSrc"
      width="32"
      height="32"
    />
    <div class="button-block">
      <template v-if="!isAuthenticated">
        <a class="tm-link" @click.prevent="onHome">Home</a>
        <a class="tm-link" @click.prevent="onLogin">Login</a>
        <button class="btn primary-btn" @click.prevent="onRegister">Register</button>
      </template>
      <template v-else>
        <a class="tm-link" @click.prevent="onLogout">Logout</a>
      </template>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import unlinkSrc from '@/assets/unlink-solid.svg';

export default defineComponent({
  name: 'Header',
  data() {
    return {
      unlinkSrc,
    };
  },
  computed: {
    ...mapGetters({ userData: 'userData', isAuthenticated: 'isAuthenticated' }),
  },
  methods: {
    ...mapActions({ logout: 'logout' }),
    onHome() {
      this.$router.push({ path: '/' });
    },
    onRegister() {
      this.$router.push({ path: '/register' });
    },
    onLogin() {
      this.$router.push({ path: '/login' });
    },
    onLogout() {
      this.logout();
      this.$router.push({ path: '/' });
    },
  },
});
</script>

<style scoped>
  header {
    z-index: 100;
    background: white;
    position: fixed;
    top: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid 1px #d0d2d4;
    padding: 24px;
    height: 100px;
    width: 100%;
  }

  header .header1 {
    cursor: pointer;
  }

  .logo-block {
    display: none;
  }

  .info-block {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 655px) {
    .info-block {
      display: none;
    }

    .logo-block {
      display: block;
    }
  }

  @media (max-width: 380px) {
    .logo-block {
      display: none;
    }

    header {
      padding: 8px;
      justify-content: center;
    }
  }

  .button-block {
    display: flex;
    align-items: center;
  }

  a:nth-child(2) {
    margin: 0 40px;
  }

  button:first-child {
    margin-right: 16px;
  }

  header h1 {
    margin-bottom: 16px;
  }
</style>
