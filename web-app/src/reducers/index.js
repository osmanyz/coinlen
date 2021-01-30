import { combineReducers } from 'redux';
import { coinsReducer } from './coinReducer';
import { paymentsReducer, doPaymentReducer } from './paymentReducer';
import { userAccountReducer } from './userAccountReducer';
import { notificationsReducer } from './notificationReducer';
import { authReducer, emailActivationReducer } from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  coins: coinsReducer,
  payments: paymentsReducer,
  doPayment: doPaymentReducer,
  userAccount: userAccountReducer,
  notifications: notificationsReducer,
  emailActivation: emailActivationReducer,
});
