import { Nullabale } from 'const';
import {
  AuthReducerTypes,
  InitialStateType,
} from 'features/authorization/dal/authReducer/authTypes';

export const initialState = {
  isLoggedIn: false,
  isFetching: false,
  authError: null as Nullabale<string>,
};

export const authReducer = (
  state = initialState,
  action: AuthReducerTypes,
): InitialStateType => {
  switch (action.type) {
    case 'AUTH_LOGGING_IN':
      return { ...state, isLoggedIn: action.payload.isLoggedIn };
    case 'AUTH_SET_AUTH_ERROR':
      return { ...state, authError: action.payload.authError };
    case 'AUTH_SET_FETCHING': {
      return { ...state, isFetching: action.payload.isFetching };
    }
    default:
      return state;
  }
};
