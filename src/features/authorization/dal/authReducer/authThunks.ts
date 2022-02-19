import axios from 'axios';

import { setUser } from 'bll/profileReducer';
import { AppThunkType } from 'bll/Store';
import { handleCatchError } from 'const';
import { authAPI } from 'features/authorization/api/authApit';
import { LoginData } from 'features/authorization/api/authTypes';
import {
  loggingInAC,
  setAuthError,
} from 'features/authorization/dal/authReducer/authActions';

export const loginTC =
  (data: LoginData): AppThunkType =>
  async dispatch => {
    try {
      const res = await authAPI.login(data);
      if (res.data._id) {
        dispatch(loggingInAC(true));
        dispatch(setUser(res.data));
      }
    } catch (error) {
      dispatch(loggingInAC(false));
      handleCatchError(error, dispatch);
    }
  };

export const authMe = (): AppThunkType => async dispatch => {
  try {
    const res = await authAPI.me();
    dispatch(loggingInAC(true));
    dispatch(setUser(res.data));
  } catch (error) {
    if (axios.isAxiosError(error) && error.response)
      dispatch(setAuthError(error.response.data.error));
    else if (axios.isAxiosError(error)) {
      dispatch(setAuthError(error.message));
    }
  }
};

export const logout = (): AppThunkType => async dispatch => {
  try {
    dispatch(loggingInAC(false));
    await authAPI.logout();
  } catch (error) {
    handleCatchError(error, dispatch);
  }
};
