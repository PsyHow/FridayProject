import { UserType } from 'bll/profileReducer';
import { AppRootStoreType } from 'bll/Store';

export const selectCurrentUserId = (state: AppRootStoreType): string =>
  state.profileReducer.user._id;

export const selectUser = (state: AppRootStoreType): UserType =>
  state.profileReducer.user;
