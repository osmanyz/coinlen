import * as types from '../actions/types';

const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function (state = initialState, action) {
  if (action.type === types.AUTHENTICATION_USER) {
    return {
      ...state,
      isAuthenticated: !isEmpty(action.user),
      user: action.user,
    };
  } else {
    return state;
  }
}
