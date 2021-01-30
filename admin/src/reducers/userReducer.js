import {
  USERS_LIST,
  CREATE_USER,
  SHOW_USER,
  EDIT_USER,
  DELETE_USER,
  SEND_CONFIRM_EMAIL_TO_USER,
  SEND_EMAIL_ACTIVATION_TO_USER,
  RESTART_SYSTEM,
} from '../actions/types';

const initialState = {
  isLoading: true,
  isListLoading: true,
  isCreateLoading: true,
  isShowLoading: true,
  isEditLoading: true,
  isDeleteLoading: true,
  isRestartSystemLoading: true,
  isSendConfirmEmailLoading: true,
  isSendEmailActivationLoading: true,
  statusCode: 404,
  status: false,
  error: null,
  message: null,
  data: null,
};

export function usersReducer(state = initialState, action) {
  switch (action.type) {
    case USERS_LIST:
      return {
        ...state,
        ...action.payload,
        isListLoading: false,
      };
    case CREATE_USER:
      return {
        ...state,
        ...action.payload,
        isCreateLoading: false,
      };
    case SHOW_USER:
      return {
        ...state,
        ...action.payload,
        isShowLoading: false,
      };
    case EDIT_USER:
      return {
        ...state,
        ...action.payload,
        isEditLoading: false,
      };
    case DELETE_USER:
      return {
        ...state,
        ...action.payload,
        isDeleteLoading: false,
      };
    case SEND_CONFIRM_EMAIL_TO_USER:
      return {
        ...state,
        ...action.payload,
        isSendConfirmEmailLoading: false,
      };
    case SEND_EMAIL_ACTIVATION_TO_USER:
      return {
        ...state,
        ...action.payload,
        isSendEmailActivationLoading: false,
      };
    case RESTART_SYSTEM:
      return {
        ...state,
        ...action.payload,
        isRestartSystemLoading: false,
      };
    default:
      return {
        ...state,
        isLoading: false,
      };
  }
}
