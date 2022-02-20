import { AppRootStoreType } from 'bll/Store';

export const selectCurrentUserId = (state: AppRootStoreType): string =>
  state.profileReducer.user._id;
