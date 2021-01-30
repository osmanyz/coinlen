import { AUTHENTICATION_USER } from './types';
import { errorAction } from './index';
import { apiAuthLogin } from '../api/auth';

export const authenticationUserAction = (user) => ({
  type: AUTHENTICATION_USER,
  user,
});

export const loginUserAction = (credentials) => async (dispatch) => {
  apiAuthLogin(credentials)
    .then((response) => {
      if (response.data.status) {
        dispatch(authenticationUserAction(response.data));

        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('userEmail', response.data.user.email);
        localStorage.setItem('userAccount', JSON.stringify(response.data.user));

        window.location.href = '/dashboard';
      } else {
        dispatch(errorAction(response.data.message));
        dispatch(authenticationUserAction(null));
      }
    })
    .catch((error) => {
      dispatch(errorAction(error));
      dispatch(authenticationUserAction(null));
    });
};

export const logoutAction = () => (dispatch) => {
  localStorage.clear();

  dispatch(errorAction(null));
  dispatch(authenticationUserAction(null));
};
