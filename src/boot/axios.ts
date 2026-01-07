// noinspection TypeScriptValidateTypes
import { boot } from 'quasar/wrappers';
import { Notify } from 'quasar';
import axios from 'axios';
import { useAuthStore } from 'src/stores/auth';

const URL_API = 'http://127.0.0.1/api';
const $axios = axios.create({
  baseURL: URL_API,
  withCredentials: true,
});

const showErrorNotification = (message?: string, caption = 'Error') => {
  console.log(message, caption);
  return Notify.create({
    message: message || 'Ooooops! An error occured',
    caption: caption || 'Contact support for more information',
    color: 'negative'
  });
};

export default boot(({ app, router }) => {
  $axios.interceptors.request.use(
    config => {
      const authStore = useAuthStore();
      const getToken = authStore.getUser();
      console.log('TOKEN::: ', getToken);
      if (getToken) {
        config.headers['Authorization'] = 'Bearer ' + getToken;
      }
      config.headers['Content-Type'] = 'application/json';
      return config;
    },
    error => {
      console.log('ERROR::: ' + error);
      Promise.reject(error);
    }
  );

  $axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const authStore = useAuthStore();
      const getToken: string = authStore.getUser();

      if ([401, 400].includes(error.response.status) && originalRequest.url === '/auth/refresh') {
        showErrorNotification();
        await router.push('/Login');
        return Promise.reject(error);
      }

      if (error.response.status === 400) {
        console.log(error.response.data.message);
        showErrorNotification(error.response.data.message);
        return Promise.reject(error);
      }

      console.log(originalRequest._retry);
      if (error.response.status === 401) {
        originalRequest._retry = true;
        return $axios.post('/auth/refresh').then(res => {
          if (res.status === 401) {
            authStore.saveUser(res.data.access_token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + getToken;
            return axios(originalRequest);
          }
        });
      }

      return error;
    },
  );
});

export { $axios };
