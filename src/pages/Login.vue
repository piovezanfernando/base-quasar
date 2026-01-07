<template>
  <q-layout>
    <q-page-container>
      <q-page class="row no-wrap items-stretch">
        <!-- Left Side: Immersive Visual -->
        <div class="col-12 col-md-7 flex flex-center relative-position overflow-hidden gt-sm">
          <div class="absolute-full bg-gradient animated-gradient"></div>
          <div class="z-top text-white q-pa-xl text-center">
            <h1 class="text-h2 text-weight-bolder q-mb-md">Forge Your API</h1>
            <p class="text-h6 text-weight-light opacity-80">
              Generating excellence from your database structure.
            </p>
            <q-icon name="auto_awesome" size="120px" class="q-mt-xl opacity-20" />
          </div>
        </div>

        <!-- Right Side: Login Form -->
        <div class="col-12 col-md-5 flex flex-center bg-slate-50">
          <div class="full-width q-px-xl" style="max-width: 500px">
            <div class="text-center q-mb-xl">
              <q-icon name="auto_awesome" color="primary" size="4.5rem" class="q-mb-md" />
              <h2 class="text-h4 text-weight-bold text-slate-800 q-my-none">Welcome back</h2>
              <p class="text-slate-500 q-mt-sm">Enter your credentials to manage your APIs</p>
            </div>

            <q-form class="q-gutter-y-lg" @submit="submitForm">
              <q-input
                v-model="email"
                label="Email Address"
                outlined
                bg-color="white"
                label-color="slate-500"
                class="modern-input"
              >
                <template v-slot:prepend>
                  <q-icon name="mail_outline" color="slate-400" />
                </template>
              </q-input>

              <q-input
                v-model="password"
                type="password"
                label="Password"
                outlined
                bg-color="white"
                label-color="slate-500"
                class="modern-input"
              >
                <template v-slot:prepend>
                  <q-icon name="lock_open" color="slate-400" />
                </template>
              </q-input>

              <div class="row items-center justify-between q-mt-md">
                <q-checkbox v-model="rememberMe" label="Remember me" color="primary" class="text-slate-600" />
                <q-btn flat no-caps color="primary" label="Forgot password?" />
              </div>

              <q-btn
                type="submit"
                color="primary"
                size="lg"
                unelevated
                class="full-width q-py-md text-weight-bold"
                label="Sign In"
                :loading="isLoading"
              >
                <template v-slot:loading>
                  <q-spinner-oval />
                </template>
              </q-btn>
            </q-form>

            <div class="text-center q-mt-xl">
              <p class="text-slate-400 text-caption">
                © 2026 API Forge. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import { LoginRequest } from 'src/models/authentication';

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const email = ref('');
    const password = ref('');
    const rememberMe = ref(false);

    const authStore = useAuthStore();

    const submitForm = async () => {
      const credentials: LoginRequest = {
        email: email.value,
        password: password.value,
      };

      try {
        await authStore.login(credentials);
      } catch (error) {
        console.error('Login error:', error);
      }
    };

    return {
      email,
      password,
      rememberMe,
      submitForm,
      isLoading: authStore.isLoading,
    };
  },
});
</script>

<style lang="scss" scoped>
.bg-slate-50 {
  background-color: #f8fafc;
}

.text-slate-800 { color: #1e293b; }
.text-slate-600 { color: #475569; }
.text-slate-500 { color: #64748b; }
.text-slate-400 { color: #94a3b8; }

.bg-gradient {
  background: linear-gradient(-45deg, #6366f1, #8b5cf6, #ec4899, #3b82f6);
  background-size: 400% 400%;
}

.animated-gradient {
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.opacity-80 { opacity: 0.8; }
.opacity-20 { opacity: 0.2; }

.modern-input {
  :deep(.q-field__control) {
    border-radius: 12px !important;
    transition: all 0.3s ease;
    border-color: #e2e8f0;
    
    &:hover {
      border-color: #cbd5e1;
    }
  }
}
</style>