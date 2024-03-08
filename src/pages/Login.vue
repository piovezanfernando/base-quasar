<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="profile.svg">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Log in
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md"
              @submit="submitForm"
              ref="form"
            >
              <q-input
                filled
                v-model="email"
                label="Username"
                lazy-rules
              />

              <q-input
                type="password"
                filled
                v-model="password"
                label="Password"
                lazy-rules

              />

              <div>
                <q-btn label="Login" type="submit" color="primary" :loading="isLoading"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useAuthStore } from 'stores/auth';
import { LoginRequest } from 'src/models/authentication';

export default {
  name: 'LoginPage',
  setup() {
    console.log('entrou aqui');
    const email = ref('');
    const password = ref('');

    const { isLoading, login } = useAuthStore();

    const submitForm = async () => {
      const credentials: LoginRequest = {
        email: email.value,
        password: password.value,
      };

      try {
        await login(credentials);
        // Redirecione para a próxima página ou faça algo após o login bem-sucedido
      } catch (error) {
        // Trate erros de autenticação aqui
        console.error('Erro no login:', error);
      }
    };

    return {
      email,
      password,
      submitForm,
      isLoading,
    };
  },
};
</script>
<style>

.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}
</style>