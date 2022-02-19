import { loggingInAC, setAuthError, setFetching } from './authActions';

import { initialState } from 'features/authorization/dal/authReducer/authReducer';

export type AuthReducerStateType = {
  isLogged: boolean;
  error: string;
};

export type AuthReducerTypes =
  | ReturnType<typeof loggingInAC>
  | ReturnType<typeof setFetching>
  | ReturnType<typeof setAuthError>;

export type InitialStateType = typeof initialState;
