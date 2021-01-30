import { COINS_LIST, CREATE_COIN, SHOW_COIN, EDIT_COIN, DELETE_COIN } from '../actions/types';

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

export function coinsReducer(state = initialState, action) {
  switch (action.type) {
    case COINS_LIST:
      return {
        ...state,
        ...action.payload,
        isListLoading: false,
      };
    case CREATE_COIN:
      return {
        ...state,
        ...action.payload,
        isCreateLoading: false,
      };
    case SHOW_COIN:
      return {
        ...state,
        ...action.payload,
        isShowLoading: false,
      };
    case EDIT_COIN:
      return {
        ...state,
        ...action.payload,
        isEditLoading: false,
      };
    case DELETE_COIN:
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
