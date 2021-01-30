import api from './api';

export function payments(credentials) {
  return api.post('/api/payment/', credentials);
}

export function doPayment(credentials) {
  return api.post('/api/payment/do', credentials);
}
