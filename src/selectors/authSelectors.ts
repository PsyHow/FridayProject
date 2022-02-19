import { AppRootStoreType } from 'bll/Store';

export const selectIsLoggedIn = (state: AppRootStoreType): boolean =>
  state.authReducer.isLoggedIn;
export const selectIsFetching = (state: AppRootStoreType): boolean =>
  state.authReducer.isFetching;
