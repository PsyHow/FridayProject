import { initialState } from './registrationReducer';

import {
  confirmRegistrationDataAC,
  isFetching,
  sendEmail,
  setError,
  setNewPassword,
} from 'features/authorization/dal/registrationReducer/registrationActions';

export type InitialStateType = typeof initialState;

export type SetErrorType = ReturnType<typeof setError>;

export type RegistrationTypes =
  | ReturnType<typeof isFetching>
  | ReturnType<typeof setNewPassword>
  | ReturnType<typeof sendEmail>
  | ReturnType<typeof confirmRegistrationDataAC>
  | SetErrorType;
