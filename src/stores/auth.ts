import { defineStore } from 'pinia';
import { LoginRequest } from 'src/models/authentication';
import AUTH from 'src/api/auth.js';

const USER_KEY = 'user';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoading: false,
  }),
  actions: {
    getUser(): string {
      return <string>localStorage.getItem(USER_KEY);
    },
    saveUser(user: any) {
      localStorage.setItem(USER_KEY, user);
    },
    login: async function(credentials: LoginRequest) {
      this.isLoading = true;
      try {
        try {
          const response = await AUTH.login(credentials);
          if (response.status === 200) {
            this.saveUser(response.data.access_token);
            await this.router.isReady();
            await this.router.push({ name: 'Index'});
          }
          return response;
        } catch (err) {
          return console.log(err);
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
});