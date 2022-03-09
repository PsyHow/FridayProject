import { UserType } from 'bll/types';

export const setUser = (userData: UserType) => ({ type: 'SET_USER', userData } as const);

export const updateProfileData = (data: UserType) =>
  ({ type: 'UPDATE_PROFILE_DATA', data } as const);
