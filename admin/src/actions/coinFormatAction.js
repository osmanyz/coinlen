import { errorAction } from './index';
import { COINS_FORMAT_LIST, CREATE_COIN_FORMAT, SHOW_COIN_FORMAT, EDIT_COIN_FORMAT, DELETE_COIN_FORMAT } from './types';
import { coinsFormat, createCoinFormat, showCoinFormat, editCoinFormat, deleteCoinFormat } from '../api/coinFormat';

export const coinsFormatAction = (credentials) => async (dispatch) => {
  console.log('i called 1');
  coinsFormat(credentials)
    .then((response) => {
      console.log('i called 2');
      dispatch(errorAction(null));
      dispatch({
        type: COINS_FORMAT_LIST,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};

export const createCoinFormatAction = (credentials) => async (dispatch) => {
  createCoinFormat(credentials)
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: CREATE_COIN_FORMAT,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};

export const showCoinFormatAction = (id) => async (dispatch) => {
  showCoinFormat(id)
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: SHOW_COIN_FORMAT,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};

export const editCoinFormatAction = (id, credentials) => async (dispatch) => {
  editCoinFormat(id, credentials)
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: EDIT_COIN_FORMAT,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};

export const deleteCoinFormatAction = (id) => async (dispatch) => {
  deleteCoinFormat(id)
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: DELETE_COIN_FORMAT,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};
