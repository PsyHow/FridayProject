import { SetError } from '../authReducer/authTypes';

import { initialState } from './registrationReducer';

import {
  confirmRegistrationDataAC,
  sendEmail,
  setNewPassword,
} from 'features/authorization/dal/registrationReducer/registrationActions';

export type InitialStateType = typeof initialState;

export type RegistrationTypes =
  | ReturnType<typeof setNewPassword>
  | ReturnType<typeof sendEmail>
  | ReturnType<typeof confirmRegistrationDataAC>
  | SetError;
