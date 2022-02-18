import { setUser } from 'bll/profileReducer';
import { AppThunkType } from 'bll/Store';
import { handleCatchError } from 'const';
import { authAPI } from 'features/authorization/api/authApit';
import { LoginData } from 'features/authorization/api/authTypes';
import { loggingInAC } from 'features/authorization/dal/authReducer/authActions';

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
    handleCatchError(error, dispatch);
  }
};

export const logout = (): AppThunkType => async dispatch => {
  try {
    await authAPI.logout();
    dispatch(loggingInAC(false));
  } catch (error) {
    dispatch(loggingInAC(true));
    handleCatchError(error, dispatch);
  }
};
