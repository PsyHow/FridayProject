import { Nullabale } from 'const';

export const setLoggingIn = (isLoggedIn: boolean) =>
  ({
    type: 'AUTH_LOGGING_IN',
    payload: { isLoggedIn },
  } as const);

export const setFetching = (isFetching: boolean) =>
  ({
    type: 'AUTH_SET_FETCHING',
    payload: { isFetching },
  } as const);

export const setAuthError = (authError: Nullabale<string>) =>
  ({
    type: 'AUTH_SET_AUTH_ERROR',
    payload: { authError },
  } as const);
