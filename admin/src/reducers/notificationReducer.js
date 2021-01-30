import { GET_NOTIFICATIONS, SHOW_NOTIFICATION, DELETE_NOTIFICATION } from '../actions/types';

const initialState = {
  isLoading: true,
  isNotificationsLoading: true,
  isNotificationShowLoading: true,
  isNotificationDeleteLoading: true,
  statusCode: 404,
  status: false,
  error: null,
  message: null,
  data: [],
  datum: {},
};

export function notificationsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return {
        ...state,
        ...action.payload,
        isNotificationsLoading: false,
      };
    case SHOW_NOTIFICATION:
      return {
        ...state,
        ...action.payload,
        isNotificationShowLoading: false,
      };
    case DELETE_NOTIFICATION:
      return {
        ...state,
        ...action.payload,
        isNotificationDeleteLoading: false,
      };
    default:
      return state;
  }
}
