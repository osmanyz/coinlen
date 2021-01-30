import { AUTHENTICATION_EMAIL_ACTIVATION, LOGIN_USER_ERROR, LOGIN_USER_SUCCESSFUL } from './types';
import { errorAction } from './index';
import { authLogin, authEmailActivation } from '../api/auth';

export const authenticationUserAction = (user) => ({
  type: LOGIN_USER_SUCCESSFUL,
  user,
});

export const loginUserSuccessfulAction = (payload) => ({
  type: LOGIN_USER_SUCCESSFUL,
  payload,
});

export const loginUserErrorAction = () => ({
  type: LOGIN_USER_ERROR,
});

export const loginUserAction = (credentials) => async (dispatch) => {
  dispatch(loginUserErrorAction());

  authLogin(credentials)
    .then((response) => {
      if (response.data.status) {
        dispatch(loginUserSuccessfulAction(response.data));
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('userEmail', response.data.user.email);

        window.location.href = '/guidline';
      } else {
        dispatch(errorAction(response.data.message));
        dispatch(loginUserErrorAction());
      }
    })
    .catch((error) => {
      dispatch(errorAction(error));
      dispatch(loginUserErrorAction());
    });
};

export const emailActivationAction = (token) => async (dispatch) => {
  authEmailActivation(token)
    .then((response) => {
      if (response.data.status) {
        dispatch({
          type: AUTHENTICATION_EMAIL_ACTIVATION,
          payload: response.data,
        });
      } else {
        dispatch(errorAction(response.data.message));
      }
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};

export const logoutAction = () => (dispatch) => {
  localStorage.clear();

  dispatch(errorAction(null));
  dispatch(loginUserSuccessfulAction(null));
  dispatch(loginUserErrorAction(null));
  dispatch(authenticationUserAction(null));
};
