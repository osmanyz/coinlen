import { CATCH_ERRORS } from '../actions/types.js';

const errorState = {
  isError: false,
};

export default (state = errorState, action) => {
  if (action.type === CATCH_ERRORS) {
    return {
      ...state,
      ...action,
      isError: true,
    };
  } else {
    return state;
  }
};
