import { $axios } from 'boot/axios';
import { LoginRequest } from 'src/models/authentication';
export default {
  login: (credentials: LoginRequest) => $axios.post('/auth/login', credentials),
  logout: () => $axios.get('auth/logout'),
};
