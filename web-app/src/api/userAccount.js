import api from './api';

export function updateUserAccount(credentials) {
  return api.post('/api/user/update-account', credentials);
}

export function updateUserPassword(credentials) {
  return api.post('/api/user/update-password', credentials);
}

export function sendEmailForActivation() {
  return api.post('/api/user/send-email-activate');
}

export function catchErrorLogAndReportIt(credentials) {
  return api.post('/api/user/catch-errors-log-and-report-it', credentials);
}
