import api from './api';

export function coinsFormat(credentials) {
  return api.post('/admin/coin/format', credentials);
}

export function createCoinFormat(credentials) {
  return api.post('/admin/coin/format/create', credentials);
}

export function showCoinFormat(id) {
  return api.post('/admin/coin/format/show/' + id);
}

export function editCoinFormat(id, credentials) {
  return api.post('/admin/coin/format/edit/' + id, credentials);
}

export function deleteCoinFormat(id) {
  return api.delete('/admin/coin/format/delete/' + id);
}
