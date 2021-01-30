import api from './api';

export function notifications(credentials) {
  return api.post('/api/notification/', credentials);
}

export function latestNotification() {
  return api.post('/api/notification/latest');
}

export function showNotification(id) {
  return api.post('/api/notification/show/' + id);
}
