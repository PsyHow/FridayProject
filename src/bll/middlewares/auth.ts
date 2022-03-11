import axios from 'axios';

import { setUser, setLoggingIn, setAuthError, setFetching } from 'bll/actions';
import { updateProfileData } from 'bll/actions/profile';
import { AppThunkType } from 'bll/Store';
import { handleCatchError } from 'const';
import { authAPI } from 'dal/api';
import { EditProfileData, LoginData } from 'dal/api/types';

export const fetchLogin =
  (data: LoginData): AppThunkType =>
  async dispatch => {
    dispatch(setFetching(true));

    try {
      const res = await authAPI.login(data);
      if (res.data._id) {
        dispatch(setLoggingIn(true));
        dispatch(setUser(res.data));
      }
    } catch (error) {
      dispatch(setLoggingIn(false));
      handleCatchError(error, dispatch);
    } finally {
      dispatch(setFetching(false));
    }
  };

export const authMe = (): AppThunkType => async dispatch => {
  dispatch(setFetching(true));

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
  } finally {
    dispatch(setFetching(false));
  }
};

export const logout = (): AppThunkType => async dispatch => {
  dispatch(setFetching(true));

  try {
    dispatch(setLoggingIn(false));
    await authAPI.logout();
  } catch (error) {
    handleCatchError(error, dispatch);
  } finally {
    dispatch(setFetching(false));
  }
};

export const editProfileData =
  (data: EditProfileData): AppThunkType =>
  async dispatch => {
    dispatch(setFetching(true));

    try {
      const res = await authAPI.editProfile(data);
      dispatch(updateProfileData(res.data.updatedUser));
    } catch (error) {
      handleCatchError(error, dispatch);
    } finally {
      dispatch(setFetching(false));
    }
  };
