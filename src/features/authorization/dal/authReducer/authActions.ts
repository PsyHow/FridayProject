export const loginFailAC = (error: string) =>
  ({
    type: 'LOGIN_FAILED',
    error,
  } as const);

export const loggingInAC = (isLogged: boolean) =>
  ({
    type: 'LOGGING_IN',
    isLogged,
  } as const);
