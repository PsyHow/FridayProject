import { AppRootStoreType } from 'bll/Store';
import { UserType } from 'bll/types';

export const selectCurrentUserId = (state: AppRootStoreType): string =>
  state.profileReducer.user._id;

export const selectUser = (state: AppRootStoreType): UserType =>
  state.profileReducer.user;

export const selectAvatar = (state: AppRootStoreType): string | undefined =>
  state.profileReducer.user.avatar;
