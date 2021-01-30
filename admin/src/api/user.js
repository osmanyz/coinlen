import api from './api';

export function users(credentials) {
  return api.post('/admin/user', credentials);
}

export function createUser(credentials) {
  return api.post('/admin/user/create', credentials);
}

export function showUser(id) {
  return api.post('/admin/user/show/' + id);
}

export function editUser(id, credentials) {
  return api.post('/admin/user/edit/' + id, credentials);
}

export function deleteUser(id) {
  return api.delete('/admin/user/delete/' + id);
}

export function sendConfirmEmail(id) {
  return api.post('/admin/user/send-confirm-email/' + id);
}

export function sendEmailActivation(id) {
  return api.post('/admin/user/send-email-activate/' + id);
}

export function restartSystem() {
  return api.post('/admin/user/restart-system');
}
