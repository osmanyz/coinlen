import { GET_PAYMENTS, DO_PAYMENT } from './types';
import { errorAction } from './index';
import { payments, doPayment } from '../api/payment';

export const paymentsAction = (credentials) => async (dispatch) => {
  payments(credentials)
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: GET_PAYMENTS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};

export const doPaymentAction = (credentials) => async (dispatch) => {
  doPayment(credentials)
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: DO_PAYMENT,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};

/// FOR SHORT TIME PROCESS
export const doPaymentActionPure = (credentials) => {
  return doPayment(credentials);
};
