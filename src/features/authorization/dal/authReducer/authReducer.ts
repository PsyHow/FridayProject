import {
  AuthReducerTypes,
  InitialStateType,
} from 'features/authorization/dal/authReducer/authTypes';

export const initialState = {
  isLoggedIn: false,
  error: null as null | string,
  isFetching: false,
};

export const authReducer = (
  state = initialState,
  action: AuthReducerTypes,
): InitialStateType => {
  switch (action.type) {
    case 'AUTH_LOGGING_IN':
    case 'AUTH_SET_ERROR':
    case 'AUTH_SET_FETCHING': {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};
