import { errorAction } from './index';
import {
  USERS_LIST,
  CREATE_USER,
  SHOW_USER,
  EDIT_USER,
  DELETE_USER,
  SEND_CONFIRM_EMAIL_TO_USER,
  SEND_EMAIL_ACTIVATION_TO_USER,
  RESTART_SYSTEM,
} from './types';
import {
  users,
  createUser,
  showUser,
  editUser,
  deleteUser,
  sendConfirmEmail,
  sendEmailActivation,
  restartSystem,
} from '../api/user';

export const usersAction = (credentials) => async (dispatch) => {
  users(credentials)
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: USERS_LIST,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};

export const createUserAction = (credentials) => async (dispatch) => {
  createUser(credentials)
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: CREATE_USER,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};

export const showUserAction = (id) => async (dispatch) => {
  return showUser(id)
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: SHOW_USER,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};

export const sendConfirmEmailAction = (id) => async (dispatch) => {
  return sendConfirmEmail(id)
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: SEND_CONFIRM_EMAIL_TO_USER,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};

export const sendEmailActivationAction = (id) => async (dispatch) => {
  return sendEmailActivation(id)
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: SEND_EMAIL_ACTIVATION_TO_USER,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};

export const editUserAction = (id, credentials) => async (dispatch) => {
  editUser(id, credentials)
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: EDIT_USER,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};

export const deleteUserAction = (id) => async (dispatch) => {
  deleteUser(id)
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: DELETE_USER,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};

export const restartSystemAction = () => async (dispatch) => {
  restartSystem()
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: RESTART_SYSTEM,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};
