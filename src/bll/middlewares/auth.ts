import axios from 'axios';

import { setUser, setLoggingIn, setAuthError } from 'bll/actions';
import { AppThunkType } from 'bll/Store';
import { handleCatchError } from 'const';
import { authAPI } from 'dal/api';
import { LoginData } from 'dal/api/types';

export const fetchLogin =
  (data: LoginData): AppThunkType =>
  async dispatch => {
    try {
      const res = await authAPI.login(data);
      if (res.data._id) {
        dispatch(setLoggingIn(true));
        dispatch(setUser(res.data));
      }
    } catch (error) {
      dispatch(setLoggingIn(false));
      handleCatchError(error, dispatch);
    }
  };

export const authMe = (): AppThunkType => async dispatch => {
  try {
    const res = await authAPI.me();
    dispatch(setLoggingIn(true));
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
    dispatch(setLoggingIn(false));
    await authAPI.logout();
  } catch (error) {
    handleCatchError(error, dispatch);
  }
};
