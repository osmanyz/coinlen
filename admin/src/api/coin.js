import api from './api';

export function coins(credentials) {
  return api.post('/admin/coin', credentials);
}

export function createCoin(credentials) {
  return api.post('/admin/coin/create', credentials);
}

export function showCoin(id) {
  return api.post('/admin/coin/show/' + id);
}

export function editCoin(id, credentials) {
  return api.post('/admin/coin/edit/' + id, credentials);
}

export function deleteCoin(id) {
  return api.delete('/admin/coin/delete/' + id);
}
