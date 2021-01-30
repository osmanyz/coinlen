import { CATCH_ERRORS, RESET } from './types';

export const errorAction = (payload) => {
  if (payload && typeof payload === 'object' && typeof payload.data !== 'undefined') {
    return {
      type: CATCH_ERRORS,
      error: payload.data,
    };
  }

  return {
    type: CATCH_ERRORS,
    error: payload,
  };
};

export const resetAction = () => ({
  type: RESET,
});
