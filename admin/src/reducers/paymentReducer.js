import { GET_PAYMENTS, SHOW_PAYMENT, DELETE_PAYMENT } from '../actions/types';

const initialState = {
  isLoading: true,
  isPaymentsLoading: true,
  isPaymentShowLoading: true,
  isPaymentDeleteLoading: true,
  statusCode: 404,
  status: false,
  statuses: {},
  statusesReverse: {},
  error: null,
  message: null,
  data: [],
  datum: {},
};

export function paymentsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PAYMENTS:
      return {
        ...state,
        ...action.payload,
        isPaymentsLoading: false,
      };
    case SHOW_PAYMENT:
      return {
        ...state,
        ...action.payload,
        isPaymentShowLoading: false,
      };
    case DELETE_PAYMENT:
      return {
        ...state,
        ...action.payload,
        isPaymentDeleteLoading: false,
      };
    default:
      return state;
  }
}
