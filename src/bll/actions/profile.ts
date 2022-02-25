import { UserType } from 'bll/types';

export const setUser = (userData: UserType) => ({ type: 'SET_USER', userData } as const);
