import { GET_COINS, GET_COINS_FORMAT, GET_COINS_HISTORY } from '../actions/types';

const initialState = {
  isCoinsLoading: true,
  isFormatLoading: true,
  isHistoryLoading: true,
  statusCode: 404,
  status: false,
  error: null,
  message: null,
  currency: null,
  data: null,
  formats: null,
  history: null,
};

export function coinsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COINS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };
    case GET_COINS_FORMAT:
      return {
        ...state,
        ...action.payload,
        isFormatLoading: false,
      };
    case GET_COINS_HISTORY:
      return {
        ...state,
        ...action.payload,
        isHistoryLoading: false,
      };
    default:
      return state;
  }
}
