<template>
<div class="base-card margin-auto">
  <h4 class="header2 text-align-center margin-bottom-3 margin-top-4">
    Register to save your links
  </h4>
  <form class="flex-align-center flex-col">
    <div class="form-group flex-col flex-align-center">
      <InputField
        id="register-name"
        v-model="name"
        title="e.g John Smith"
        label="Your full name"
      />
    </div>
    <div class="form-group flex-col flex-align-center">
      <InputField
        v-model="email"
        id="register-email"
        title="example@something.com"
        label="Your email-address"
        type="email"
      />
    </div>
    <div class="form-group flex-col flex-align-center">
      <InputField
        v-model="password"
        id="register-password"
        label="Your password"
        type="password"
      />
    </div>
    <button type="submit" @click.prevent="onRegister" class="btn primary-btn margin-top-3">
      Register
    </button>
  </form>
</div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import { RegisterFormData } from '@/types';
import InputField from '@/components/InputField.vue';

interface RegisterData {
  name: string,
  password: string,
  email: string,
}

export default defineComponent({
  name: 'Register',
  components: {
    InputField,
  },
  data() {
    return {
      name: '',
      password: '',
      email: '',
    } as RegisterData;
  },
  methods: {
    async onRegister() {
      const payload: RegisterFormData = {
        email: this.email,
        password: this.password,
        name: this.name,
      };

      const user = await this.registerUser(payload);

      if (user) {
        this.$router.push('/');
      }
    },
    ...mapActions({ registerUser: 'registerUser' }),
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
