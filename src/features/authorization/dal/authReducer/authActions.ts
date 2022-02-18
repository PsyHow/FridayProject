export const setError = (error: null | string) =>
  ({
    type: 'AUTH_SET_ERROR',
    payload: { error },
  } as const);

export const loggingInAC = (isLoggedIn: boolean) =>
  ({
    type: 'AUTH_LOGGING_IN',
    payload: { isLoggedIn },
  } as const);

export const setFetching = (isFetching: boolean) =>
  ({
    type: 'AUTH_SET_FETCHING',
    payload: { isFetching },
  } as const);
