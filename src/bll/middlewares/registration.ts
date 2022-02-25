import {
  setFetching,
  sendEmail,
  setError,
  setNewPassword,
  confirmRegistrationData,
} from 'bll/actions';
import { AppThunkType } from 'bll/Store';
import { handleCatchError } from 'const';
import { authAPI } from 'dal/api';

export const recoverPassword =
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

export const setSignUp =
  (email: string, password: string): AppThunkType =>
  async dispatch => {
    dispatch(setFetching(true));

    try {
      await authAPI.signUp(email, password);
      dispatch(setFetching(false));
      dispatch(confirmRegistrationData(true));
    } catch (error) {
      dispatch(setFetching(false));
      handleCatchError(error, dispatch);
    }
  };
