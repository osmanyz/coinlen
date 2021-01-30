import api from './api';

export function apiAuthLogin(credentials) {
  credentials.time = Date.now();
  return api.post('/auth/super-login', credentials);
}

export function apiAuthCheck({ token, email }) {
  return api.post('/auth/check', { token: token, email: email });
}
