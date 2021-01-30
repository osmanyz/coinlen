export const checkMessage = ({ errors, successMsg, errorMsg }) => {
  if (errors.error === null) {
    return {
      success: successMsg,
      error: null,
    };
  } else if (typeof errors.error === 'object' && typeof errors.error.message !== 'undefined') {
    return {
      success: null,
      error: errors.error.message !== null ? errors.error.message : errorMsg,
    };
  } else {
    return {
      success: successMsg,
      error: null,
    };
  }
};
