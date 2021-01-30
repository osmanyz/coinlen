import { GET_PAYMENTS, SHOW_PAYMENT, DELETE_PAYMENT } from './types';
import { errorAction } from './index';
import { payments, showPayment, deletePayment } from '../api/payment';

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

export const showPaymentAction = (id) => async (dispatch) => {
  showPayment(id)
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: SHOW_PAYMENT,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};

export const deletePaymentAction = (id) => async (dispatch) => {
  deletePayment(id)
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: DELETE_PAYMENT,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};
