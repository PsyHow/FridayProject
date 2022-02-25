import { Nullabale } from 'const';

export const setInitialized = (isInitialized: boolean) =>
  ({
    type: 'APP_SET_INITIALZED',
    payload: { isInitialized },
  } as const);

export const setError = (error: Nullabale<string>) =>
  ({
    type: 'APP_SET_ERROR',
    payload: { error },
  } as const);
