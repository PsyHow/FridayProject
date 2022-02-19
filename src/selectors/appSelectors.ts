import { AppRootStoreType } from 'bll/Store';

export const selectError = (state: AppRootStoreType): null | string =>
  state.appReducer.error;
export const selectInitialized = (state: AppRootStoreType): boolean =>
  state.appReducer.initialized;
