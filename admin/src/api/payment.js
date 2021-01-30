import api from './api';

export function payments(credentials) {
  return api.post('/admin/payment', credentials);
}

export function showPayment(id) {
  return api.post('/admin/payment/show/' + id);
}

export function deletePayment(id) {
  return api.post('/admin/payment/delete/' + id);
}
