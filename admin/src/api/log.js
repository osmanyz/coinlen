import api from './api';

export function logs(credentials) {
  return api.post('/admin/log', credentials);
}

export function showLog(id) {
  return api.post('/admin/log/show/' + id);
}

export function deleteLog(id) {
  return api.post('/admin/log/delete/' + id);
}
