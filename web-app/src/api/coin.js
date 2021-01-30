import api from './api';

export function apiCoins() {
  return api.post('/api/coin');
}

export function apiCoinsFormat() {
  return api.post('/api/coin/format');
}

export function apiCoinsHistory(coin) {
  return api.post(`/api/coin/history/${coin}`);
}
