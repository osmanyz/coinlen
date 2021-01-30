import api from './api';

export function apiUpdateCurrency(credentials) {
  return api.post('/admin/currency/update', credentials);
}
