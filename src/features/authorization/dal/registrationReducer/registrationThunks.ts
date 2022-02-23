import { setFetching } from '../authReducer/authActions';

import { setError } from 'bll/appReducer';
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
      dispatch(setFetching(false));
      dispatch(sendEmail(true));
    } catch (error) {
      dispatch(setFetching(false));
      handleCatchError(error, dispatch);
    }
  };

export const fetchNewPassword =
  (password: string, token: string): AppThunkType =>
  async dispatch => {
    dispatch(setFetching(true));

    try {
      await authAPI.newPassword({ password, resetPasswordToken: token });
      dispatch(setFetching(false));
      dispatch(setNewPassword(true));
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
      dispatch(setFetching(false));
      dispatch(confirmRegistrationDataAC(true));
    } catch (error) {
      dispatch(setFetching(false));
      handleCatchError(error, dispatch);
    }
  };
