import { GET_COINS, GET_COINS_FORMAT, GET_COINS_HISTORY } from './types';
import { errorAction } from './index';
import { apiCoins, apiCoinsFormat, apiCoinsHistory } from '../api/coin';

export const coinsAction = () => async (dispatch) => {
  apiCoins()
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: GET_COINS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};

export const coinsFormatAction = () => async (dispatch) => {
  apiCoinsFormat()
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: GET_COINS_FORMAT,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};

export const coinsHistoryAction = (coin) => async (dispatch) => {
  apiCoinsHistory(coin)
    .then((response) => {
      dispatch(errorAction(null));
      dispatch({
        type: GET_COINS_HISTORY,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(errorAction(error));
    });
};
