<template>
<div class="base-card margin-auto">
  <h4 class="header2 text-align-center margin-bottom-3 margin-top-4">
    Login
  </h4>
  <form class="flex-align-center flex-col">
    <div class="form-group flex-col flex-align-center">
      <InputField
        v-model="email"
        id="login-email"
        title="example@something.com"
        label="Your email-address"
        :error="emailError"
      />
    </div>
    <div class="form-group flex-col flex-align-center">
      <InputField
        v-model="password"
        id="login-password"
        label="Your password"
        type="password"
        :error="passwordError"
      />
    </div>
    <button type="submit" @click.prevent="onLogin" class="btn primary-btn margin-top-3">
      Login
    </button>
  </form>
</div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { LoginFormData } from '@/types';
import InputField from '@/components/InputField.vue';
import { commonEmailValidation, commonPasswordValidation } from '@/utils/commonValidators';

interface LoginData {
  password: string,
  email: string,
}

export default defineComponent({
  name: 'Login',
  components: {
    InputField,
  },
  data() {
    return {
      password: '',
      email: '',
    } as LoginData;
  },
  computed: {
    ...mapGetters({ isAuthenticated: 'isAuthenticated' }),
    emailError(): string | null {
      return commonEmailValidation(this.email);
    },
    passwordError(): string | null {
      return commonPasswordValidation(this.password);
    },
    allowSubmit(): boolean {
      return !this.passwordError && !this.emailError;
    },
  },
  created() {
    // TODO move this type of logic into router middleware.
    if (this.isAuthenticated) this.$router.push('/');
  },
  methods: {
    async onLogin() {
      const payload: LoginFormData = {
        email: this.email,
        password: this.password,
      };

      if (!this.allowSubmit) return;

      const user = await this.loginUser(payload);

      if (user) {
        this.$router.push('/');
      }
    },
    ...mapActions({ loginUser: 'loginUser' }),
  },
});
</script>

<style scoped>

.base-card {
  padding: 32px 48px;
  max-width: 700px;
}

form input {
  margin-bottom: 16px;
}

</style>
