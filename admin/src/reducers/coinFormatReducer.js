import {
  COINS_FORMAT_LIST,
  CREATE_COIN_FORMAT,
  SHOW_COIN_FORMAT,
  EDIT_COIN_FORMAT,
  DELETE_COIN_FORMAT,
} from '../actions/types';

const initialState = {
  isLoading: true,
  isListLoading: true,
  isCreateLoading: true,
  isShowLoading: true,
  isEditLoading: true,
  isDeleteLoading: true,
  statusCode: 404,
  status: false,
  error: null,
  message: null,
  data: null,
};

export function coinsFormatReducer(state = initialState, action) {
  switch (action.type) {
    case COINS_FORMAT_LIST:
      return {
        ...state,
        ...action.payload,
        isListLoading: false,
      };
    case CREATE_COIN_FORMAT:
      return {
        ...state,
        ...action.payload,
        isCreateLoading: false,
      };
    case SHOW_COIN_FORMAT:
      return {
        ...state,
        ...action.payload,
        isShowLoading: false,
      };
    case EDIT_COIN_FORMAT:
      return {
        ...state,
        ...action.payload,
        isEditLoading: false,
      };
    case DELETE_COIN_FORMAT:
      return {
        ...state,
        ...action.payload,
        isDeleteLoading: false,
      };
    default:
      return {
        ...state,
        isLoading: false,
      };
  }
}
