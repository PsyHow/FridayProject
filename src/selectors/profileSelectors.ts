import { AppRootStoreType } from 'bll/Store';
import { UserType } from 'bll/types';

export const selectCurrentUserId = (state: AppRootStoreType): string | undefined =>
  state.profileReducer._id;

export const selectUser = (state: AppRootStoreType): UserType => state.profileReducer;

export const selectAvatar = (state: AppRootStoreType): string =>
  state.profileReducer.avatar;
