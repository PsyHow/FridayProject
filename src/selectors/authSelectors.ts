import { AppRootStoreType } from 'bll/Store';

export const selectIsLoggedIn = (state: AppRootStoreType): boolean =>
  state.authReducer.isLoggedIn;
export const selectError = (state: AppRootStoreType): null | string =>
  state.authReducer.error;
export const selectIsFetching = (state: AppRootStoreType): boolean =>
  state.authReducer.isFetching;
