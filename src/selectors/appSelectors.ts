import { AppRootStoreType } from 'bll/Store';
import { Nullabale } from 'const';

export const selectError = (state: AppRootStoreType): Nullabale<string> =>
  state.appReducer.error;
export const selectInitialized = (state: AppRootStoreType): boolean =>
  state.appReducer.initialized;
