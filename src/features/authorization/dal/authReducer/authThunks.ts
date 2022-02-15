import axios from 'axios';

import { setUser } from 'bll/profileReducer';
import { AppThunkType } from 'bll/Store';
import { errorString } from 'const';
import { authAPI } from 'features/authorization/api/authApit';
import { LoginData } from 'features/authorization/api/authTypes';
import { loggingInAC } from 'features/authorization/dal/authReducer/authActions';
import { setError } from 'features/authorization/dal/registrationReducer/registrationActions';

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
      const errorMessage = (error as Error).message || errorString;
      dispatch(setError(errorMessage));
    }
  };

export const authMe = (): AppThunkType => async dispatch => {
  try {
    const res = await authAPI.me();
    dispatch(setUser(res.data));
    dispatch(loggingInAC(true));
  } catch (error) {
    dispatch(loggingInAC(false));
    if (axios.isAxiosError(error) && error.response)
      dispatch(setError(error.response.data.error));
    else if (axios.isAxiosError(error)) {
      dispatch(setError(error.message));
    }
  }
};

export const logout = (): AppThunkType => async dispatch => {
  try {
    await authAPI.logout();
    dispatch(loggingInAC(false));
  } catch (error) {
    if (axios.isAxiosError(error) && error.response)
      dispatch(setError(error.response.data.error));
    else if (axios.isAxiosError(error)) {
      dispatch(setError(error.message));
    }
  }
};
