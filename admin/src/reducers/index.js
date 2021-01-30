import { combineReducers } from 'redux';
import { logsReducer } from './logReducer';
import { usersReducer } from './userReducer';
import { coinsReducer } from './coinReducer';
import { coinsFormatReducer } from './coinFormatReducer';
import { paymentsReducer } from './paymentReducer';
import { notificationsReducer } from './notificationReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  logs: logsReducer,
  users: usersReducer,
  coins: coinsReducer,
  coinsFormat: coinsFormatReducer,
  payments: paymentsReducer,
  notifications: notificationsReducer,
});
