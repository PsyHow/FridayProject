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
      dispatch(sendEmail(true));
    } catch (error) {
      handleCatchError(error, dispatch);
    } finally {
      dispatch(setFetching(false));
    }
  };

export const fetchNewPassword =
  (password: string, token: string): AppThunkType =>
  async dispatch => {
    dispatch(setFetching(true));

    try {
      await authAPI.newPassword({ password, resetPasswordToken: token });
      dispatch(setNewPassword(true));
      dispatch(setError(''));
    } catch (error) {
      handleCatchError(error, dispatch);
    } finally {
      dispatch(setFetching(false));
    }
  };

export const setSignUp =
  (email: string, password: string): AppThunkType =>
  async dispatch => {
    dispatch(setFetching(true));

    try {
      await authAPI.signUp(email, password);
      dispatch(confirmRegistrationData(true));
    } catch (error) {
      handleCatchError(error, dispatch);
    } finally {
      dispatch(setFetching(false));
    }
  };
