import { UPDATE_USER_ACCOUNT, UPDATE_USER_PASSWORD, SEND_EMAIL_FOR_ACTIVATION } from '../actions/types';

const initialState = {
  isSendEmailActivateLoading: true,
  isUpdateAccountLoading: true,
  isUpdatePasswordLoading: true,
  statusCode: 404,
  status: false,
  error: null,
  message: null,
  old_account: null,
  new_account: null,
};

export function userAccountReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_ACCOUNT:
      return {
        ...state,
        ...action.payload,
        isUpdateAccountLoading: false,
      };
    case UPDATE_USER_PASSWORD:
      return {
        ...state,
        ...action.payload,
        isUpdatePasswordLoading: false,
      };
    case SEND_EMAIL_FOR_ACTIVATION:
      return {
        ...state,
        ...action.payload,
        isSendEmailActivateLoading: false,
      };
    default:
      return state;
  }
}
