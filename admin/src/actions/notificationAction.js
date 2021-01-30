import { GET_NOTIFICATIONS, SHOW_NOTIFICATION, DELETE_NOTIFICATION } from './types';
import { errorAction } from './index';
import { notifications, showNotification, deleteNotification } from '../api/notification';

export const notificationsAction = (credentials) => async (dispatch) => {
  notifications(credentials)
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: GET_NOTIFICATIONS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};

export const notificationShowAction = (id) => async (dispatch) => {
  showNotification(id)
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};

export const notificationDeleteAction = (id) => async (dispatch) => {
  deleteNotification(id)
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: DELETE_NOTIFICATION,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};
