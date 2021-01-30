import { GET_LOGS, SHOW_LOG, DELETE_LOG } from './types';
import { errorAction } from './index';
import { logs, showLog, deleteLog } from '../api/log';

export const logsAction = (credentials) => async (dispatch) => {
  logs(credentials)
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: GET_LOGS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};

export const showLogAction = (id) => async (dispatch) => {
  showLog(id)
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: SHOW_LOG,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};

export const deleteLogAction = (id) => async (dispatch) => {
  deleteLog(id)
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: DELETE_LOG,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};
