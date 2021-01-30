import { GET_NOTIFICATIONS, LATEST_NOTIFICATIONS, SHOW_NOTIFICATION } from './types';
import { errorAction } from './index';
import { notifications, latestNotification, showNotification } from '../api/notification';

export const notificationsAction = (credentials, type) => async (dispatch) => {
  notifications(credentials)
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: type || GET_NOTIFICATIONS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};

export const latestNotificationsAction = () => async (dispatch) => {
  latestNotification()
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: LATEST_NOTIFICATIONS,
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
