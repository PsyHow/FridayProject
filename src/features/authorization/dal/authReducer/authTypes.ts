import { loggingInAC, setError, setFetching } from './authActions';

import { initialState } from 'features/authorization/dal/authReducer/authReducer';

export type AuthReducerStateType = {
  isLogged: boolean;
  error: string;
};

export type SetError = ReturnType<typeof setError>;

export type SetFetching = ReturnType<typeof setFetching>;

export type AuthReducerTypes = SetError | ReturnType<typeof loggingInAC> | SetFetching;

export type InitialStateType = typeof initialState;
