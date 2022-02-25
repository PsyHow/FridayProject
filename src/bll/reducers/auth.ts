import { AuthReducerTypes } from './types';

import { Nullabale } from 'const';

const initialState = {
  isLoggedIn: false,
  isFetching: false,
  authError: null as Nullabale<string>,
};

type InitialStateType = typeof initialState;

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
