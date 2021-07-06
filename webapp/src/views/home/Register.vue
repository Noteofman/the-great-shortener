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
        :error="nameError"
      />
    </div>
    <div class="form-group flex-col flex-align-center">
      <InputField
        v-model="email"
        id="register-email"
        title="example@something.com"
        label="Your email-address"
        type="email"
        :error="emailError"
      />
    </div>
    <div class="form-group flex-col flex-align-center">
      <InputField
        v-model="password"
        id="register-password"
        label="Your password (min 5 characters)"
        type="password"
        :error="passwordError"
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
import { mapActions, mapGetters } from 'vuex';
import { RegisterFormData } from '@/types';
import InputField from '@/components/InputField.vue';
import { commonEmailValidation, commonPasswordValidation } from '@/utils/commonValidators';

interface RegisterData {
  name: string,
  password: string,
  email: string,
  boom: string,
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
  computed: {
    ...mapGetters({ isAuthenticated: 'isAuthenticated' }),
    nameError(): string | null {
      let error = null;

      if (!this.name) { error = 'The name field is required.'; }
      if (this.name && this.name.length > 100) { error = 'Name cannot be more than 100 characters.'; }

      return error;
    },
    emailError(): string | null {
      return commonEmailValidation(this.email);
    },
    passwordError(): string | null {
      return commonPasswordValidation(this.password);
    },
    allowSubmit(): boolean {
      return !this.nameError && !this.passwordError && !this.emailError;
    },
  },
  created() {
    // TODO move this type of logic into router middleware.
    if (this.isAuthenticated) this.$router.push('/');
  },
  methods: {
    async onRegister() {
      const payload: RegisterFormData = {
        email: this.email,
        password: this.password,
        name: this.name,
      };

      if (!this.allowSubmit) return;

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
