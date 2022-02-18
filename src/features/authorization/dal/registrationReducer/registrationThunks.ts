import { setError, setFetching } from '../authReducer/authActions';

import { AppThunkType } from 'bll/Store';
import { handleCatchError } from 'const';
import { authAPI } from 'features/authorization/api/authApit';
import {
  confirmRegistrationDataAC,
  sendEmail,
  setNewPassword,
} from 'features/authorization/dal/registrationReducer/registrationActions';

export const recoverTC =
  (email: string): AppThunkType =>
  async dispatch => {
    dispatch(setFetching(true));
    try {
      await authAPI.forgot(email);
      dispatch(sendEmail(true));
      dispatch(setFetching(false));
    } catch (error) {
      handleCatchError(error, dispatch);
    }
  };

export const newPassword =
  (password: string, token: string): AppThunkType =>
  async dispatch => {
    dispatch(setFetching(true));
    try {
      await authAPI.newPassword({ password, resetPasswordToken: token });
      dispatch(setNewPassword(true));
      dispatch(setFetching(false));
      dispatch(setError(''));
    } catch (error) {
      dispatch(setFetching(false));
      handleCatchError(error, dispatch);
    }
  };

export const signUpTC =
  (email: string, password: string): AppThunkType =>
  async dispatch => {
    dispatch(setFetching(true));
    try {
      await authAPI.signUp(email, password);
      dispatch(confirmRegistrationDataAC(true));
      dispatch(setFetching(false));
    } catch (error) {
      dispatch(setFetching(false));
      handleCatchError(error, dispatch);
    }
  };
