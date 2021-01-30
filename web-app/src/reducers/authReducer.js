import { LOGIN_USER_SUCCESSFUL, LOGIN_USER_ERROR, AUTHENTICATION_EMAIL_ACTIVATION } from '../actions/types';

const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

const initialState = {
  isAuthenticated: false,
  isAuthenticating: true,
  isPremium: false,
  premiumDate: null,
  token: null,
  version: parseFloat('0.1.0'),
  user: {},
};

export function authReducer(state = initialState, action) {
  if (action.type === LOGIN_USER_SUCCESSFUL) {
    return {
      ...state,
      isAuthenticated: !isEmpty(action.user),
      // set version
      // set is premium
      // set premium date
      user: action.user,
    };
  } else if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      ...action,
      isAuthenticating: false,
    };
  } else {
    return state;
  }
}

const initialEmailState = {
  isLoading: true,
  status: false,
};

export function emailActivationReducer(state = initialEmailState, action) {
  if (action.type === AUTHENTICATION_EMAIL_ACTIVATION) {
    return {
      ...state,
      ...action.payload,
      isLoading: false,
    };
  } else {
    return state;
  }
}
