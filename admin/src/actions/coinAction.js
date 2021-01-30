import { errorAction } from './index';
import { COINS_LIST, CREATE_COIN, SHOW_COIN, EDIT_COIN, DELETE_COIN } from './types';
import { coins, createCoin, showCoin, editCoin, deleteCoin } from '../api/coin';

export const coinsAction = (credentials) => async (dispatch) => {
  coins(credentials)
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: COINS_LIST,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};

export const createCoinAction = (credentials) => async (dispatch) => {
  createCoin(credentials)
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: CREATE_COIN,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};

export const showCoinAction = (id) => async (dispatch) => {
  showCoin(id)
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: SHOW_COIN,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};

export const editCoinAction = (id, credentials) => async (dispatch) => {
  editCoin(id, credentials)
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: EDIT_COIN,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};

export const deleteCoinAction = (id) => async (dispatch) => {
  deleteCoin(id)
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: DELETE_COIN,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};
