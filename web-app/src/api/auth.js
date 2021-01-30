import api from './api';

export function authLogin(credentials) {
  return api.post('/auth/login', credentials);
}

export function apiAuthCheck({ token, email }) {
  return api.post('/auth/check', { token: token, email: email });
}

export function authEmailActivation(code) {
  return api.post('/auth/email-activation', { code: code });
}
