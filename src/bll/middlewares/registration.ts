import { SagaIterator } from 'redux-saga';
import { call, put, putResolve, takeEvery } from 'redux-saga/effects';

import {
  setFetching,
  setError,
  setNewPassword,
  confirmRegistrationData,
  sendEmail,
} from 'bll/actions';
import { handleCatchErrorSaga } from 'const';
import { authAPI } from 'dal/api';

function* recoverPasswordWorker({
  payload,
}: ReturnType<typeof recoverPassword>): SagaIterator {
  yield put(setFetching(true));

  try {
    yield call(authAPI.forgot, payload);
    yield put(sendEmail(true));
  } catch (error) {
    handleCatchErrorSaga(error);
  } finally {
    yield put(setFetching(false));
  }
}

export const recoverPassword = (payload: string) =>
  ({
    type: 'SAGA/RECOVER_PASSWORD',
    payload,
  } as const);

function* fetchNewPasswordWorker({
  payload,
}: ReturnType<typeof fetchNewPassword>): SagaIterator {
  yield put(setFetching(true));

  try {
    yield call(authAPI.newPassword, {
      password: payload.password,
      resetPasswordToken: payload.token,
    });
    yield put(setNewPassword(true));
    yield put(setError(''));
  } catch (error) {
    handleCatchErrorSaga(error);
  } finally {
    yield put(setFetching(false));
  }
}

export const fetchNewPassword = (password: string, token: string) =>
  ({
    type: 'SAGA/FETCH_NEW_PASSWORD',
    payload: {
      password,
      token,
    },
  } as const);

function* setSignUpWorker({ payload }: ReturnType<typeof setSignUp>): SagaIterator {
  yield putResolve(setFetching(true));

  try {
    yield call(authAPI.signUp, payload.email, payload.password);
    yield put(confirmRegistrationData(true));
  } catch (error) {
    handleCatchErrorSaga(error);
  } finally {
    yield put(setFetching(false));
  }
}

export const setSignUp = (email: string, password: string) =>
  ({
    type: 'SAGA/SET_SIGN_UP',
    payload: {
      email,
      password,
    },
  } as const);

export function* registrationWatcher(): SagaIterator {
  yield takeEvery('SAGA/SET_SIGN_UP', setSignUpWorker);
  yield takeEvery('SAGA/FETCH_NEW_PASSWORD', fetchNewPasswordWorker);
  yield takeEvery('SAGA/RECOVER_PASSWORD', recoverPasswordWorker);
}
