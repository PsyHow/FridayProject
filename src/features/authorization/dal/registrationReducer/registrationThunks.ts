import { Dispatch } from 'redux';

import { AppActionsType } from 'bll/Store';
import { authAPI } from 'features/authorization/api/authApit';
import {
  confirmRegistrationDataAC,
  isFetching,
  sendEmail,
  setError,
  setNewPassword,
} from 'features/authorization/dal/registrationReducer/registrationActions';

export const recoverTC = (email: string) => (dispatch: Dispatch) => {
  dispatch(isFetching(true));
  authAPI
    .forgot(email)
    .then(() => {
      dispatch(sendEmail(true));
    })
    .catch(e => {
      const error = e.response
        ? e.response.data.error
        : `${e.message}, more details in the console`;
      dispatch(setError(error));
    })
    .finally(() => {
      dispatch(isFetching(false));
    });
};

export const newPassword =
  (password: string, token: string) => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(isFetching(true));
    authAPI
      .newPassword({ password, resetPasswordToken: token })
      .then(() => {
        dispatch(setNewPassword(true));
        dispatch(setError(''));
      })
      .catch(e => {
        const error = e.response
          ? e.response.data.error
          : `${e.message}, more details in the console`;
        dispatch(setError(error));
      })
      .finally(() => {
        dispatch(isFetching(false));
      });
  };

export const signUpTC =
  (email: string, password: string) => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(isFetching(true));
    authAPI
      .signUp(email, password)
      .then(() => {
        dispatch(confirmRegistrationDataAC(true));
      })
      .catch(e => {
        const error = e.response
          ? e.response.data.error
          : `${e.message}, more details in the console`;
        dispatch(setError(error));
      })
      .finally(() => {
        dispatch(isFetching(false));
      });
  };
