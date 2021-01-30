import { GET_NOTIFICATIONS, LATEST_NOTIFICATIONS, SHOW_NOTIFICATION } from '../actions/types';

const initialState = {
  isLoading: true,
  isNotificationsLoading: true,
  isMoreNotificationsLoading: true,
  isLatestNotificationsLoading: true,
  isNotificationShowLoading: true,
  isNotificationDeleteLoading: true,
  statusCode: 404,
  status: false,
  error: null,
  message: null,
  count: 0,
  page: 1,
  data: [],
  moreData: [],
  datum: {},
  latest: [],
};

export function notificationsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return {
        ...state,
        ...action.payload,
        isNotificationsLoading: false,
      };
    case LATEST_NOTIFICATIONS:
      return {
        ...state,
        ...action.payload,
        isLatestNotificationsLoading: false,
      };
    case SHOW_NOTIFICATION:
      return {
        ...state,
        ...action.payload,
        isNotificationShowLoading: false,
      };
    default:
      return state;
  }
}
