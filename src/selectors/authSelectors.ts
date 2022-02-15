import { AppRootStoreType } from 'bll/Store';

export const selectIsLoggedIn = (state: AppRootStoreType): boolean =>
  state.authReducer.isLogged;
export const selectError = (state: AppRootStoreType): string => state.authReducer.error;
