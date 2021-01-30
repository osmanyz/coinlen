import { GET_PAYMENTS, DO_PAYMENT } from '../actions/types';

const initialState = {
  isPaymentsLoading: true,
  statusCode: 404,
  status: false,
  error: null,
  message: null,
  count: 0,
  page: 1,
  data: [],
  statuses: {},
  statusesReverse: {},
};

const initialStateSub = {
  isLoading: true,
  statusCode: 404,
  status: false,
  error: null,
  message: null,
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
    default:
      return state;
  }
}

export function doPaymentReducer(state = initialStateSub, action) {
  if (action.type === DO_PAYMENT) {
    return {
      ...state,
      ...action.payload,
      isLoading: false,
    };
  } else {
    return state;
  }
}
