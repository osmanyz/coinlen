import { GET_LOGS, SHOW_LOG, DELETE_LOG } from '../actions/types';

const initialState = {
  isLogsLoading: true,
  isLogShowLoading: true,
  isLogDeleteLoading: true,
  statusCode: 404,
  status: false,
  error: null,
  message: null,
  data: [],
  datum: {},
};

export function logsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOGS:
      return {
        ...state,
        ...action.payload,
        isLogsLoading: false,
      };
    case SHOW_LOG:
      return {
        ...state,
        ...action.payload,
        isLogShowLoading: false,
      };
    case DELETE_LOG:
      return {
        ...state,
        ...action.payload,
        isLogDeleteLoading: false,
      };
    default:
      return state;
  }
}
