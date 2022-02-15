import axios from 'axios';

import { AppThunkType } from 'bll/Store';
import { errorString } from 'const';
import { authAPI } from 'features/authorization/api/authApit';
import {
  confirmRegistrationDataAC,
  isFetching,
  sendEmail,
  setError,
  setNewPassword,
} from 'features/authorization/dal/registrationReducer/registrationActions';

export const recoverTC =
  (email: string): AppThunkType =>
  async dispatch => {
    dispatch(isFetching(true));
    try {
      await authAPI.forgot(email);
      dispatch(sendEmail(true));
      dispatch(isFetching(false));
    } catch (error) {
      dispatch(isFetching(false));
      if (axios.isAxiosError(error) && error.response)
        dispatch(setError(error.response.data.error));
      else if (axios.isAxiosError(error)) {
        dispatch(setError(error.message));
      }
    }
  };

export const newPassword =
  (password: string, token: string): AppThunkType =>
  async dispatch => {
    dispatch(isFetching(true));
    try {
      await authAPI.newPassword({ password, resetPasswordToken: token });
      dispatch(setNewPassword(true));
      dispatch(isFetching(false));
      dispatch(setError(''));
    } catch (error) {
      dispatch(isFetching(false));
      if (axios.isAxiosError(error) && error.response)
        dispatch(setError(error.response.data.error));
      else if (axios.isAxiosError(error)) {
        dispatch(setError(error.message));
      }
    }
  };

export const signUpTC =
  (email: string, password: string): AppThunkType =>
  async dispatch => {
    dispatch(isFetching(true));
    try {
      await authAPI.signUp(email, password);
      dispatch(confirmRegistrationDataAC(true));
      dispatch(isFetching(false));
    } catch (error) {
      dispatch(isFetching(false));
      if (axios.isAxiosError(error) && error.response)
        dispatch(setError(error.response.data.error));
      else if (axios.isAxiosError(error)) {
        dispatch(setError(error.message));
      }
    }
  };
