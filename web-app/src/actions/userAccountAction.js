import { UPDATE_USER_ACCOUNT, UPDATE_USER_PASSWORD, SEND_EMAIL_FOR_ACTIVATION } from './types';
import { errorAction } from './index';
import { updateUserAccount, updateUserPassword, sendEmailForActivation } from '../api/userAccount';

export const updateUserAccountAction = (credentials) => async (dispatch) => {
  updateUserAccount(credentials)
    .then((response) => {
      dispatch(errorAction(null));
      if (response.data.status) {
        dispatch({
          type: UPDATE_USER_ACCOUNT,
          payload: response.data,
        });
      } else {
        dispatch(errorAction(response.data));
      }
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};

export const updateUserPasswordAction = (credentials) => async (dispatch) => {
  updateUserPassword(credentials)
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: UPDATE_USER_PASSWORD,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};

export const sendEmailForActivationAction = () => async (dispatch) => {
  sendEmailForActivation()
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: SEND_EMAIL_FOR_ACTIVATION,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};
