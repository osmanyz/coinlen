import api from './api';

export function notifications(credentials) {
  return api.post('/admin/notification', credentials);
}

export function showNotification(id) {
  return api.post('/admin/notification/show/' + id);
}

export function deleteNotification(id) {
  if (id) {
    return api.post('/admin/notification/delete/' + id);
  }

  return api.post('/admin/notification/delete/');
}
