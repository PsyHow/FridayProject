import axios from 'axios';
import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';

import { setUser, setLoggingIn, setFetching, setError } from 'bll/actions';
import { updateProfileData } from 'bll/actions/profile';
import { AppThunkType } from 'bll/Store';
import { handleCatchError, handleCatchErrorSaga } from 'const';
import { authAPI } from 'dal/api';
import { EditProfileData, LoginData } from 'dal/api/types';

function* fetchLoginWorker(action: ReturnType<typeof fetchLogin>): SagaIterator {
  yield put(setFetching(true));

  try {
    const res = yield call(authAPI.login, action.payload);
    yield put(setUser(res.data));
    yield put(setLoggingIn(true));
  } catch (error) {
    if (axios.isAxiosError(error) && error.response)
      yield put(setError(error.response.data.error));
    else if (axios.isAxiosError(error)) {
      yield put(setError(error.message));
    }
  } finally {
    yield put(setFetching(false));
  }
}

export const fetchLogin = (payload: LoginData) =>
  ({
    type: 'SAGA/LOGIN',
    payload,
  } as const);

export const authMe = (): AppThunkType => async dispatch => {
  dispatch(setFetching(true));

  try {
    const res = await authAPI.me();
    dispatch(setLoggingIn(true));
    dispatch(setUser(res.data));
  } catch (error) {
    handleCatchError(error, dispatch);
  } finally {
    dispatch(setFetching(false));
  }
};

function* logoutWorker(): SagaIterator {
  yield put(setFetching(true));

  try {
    yield put(setLoggingIn(false));
    yield call(authAPI.logout);
  } catch (error) {
    handleCatchErrorSaga(error);
  } finally {
    yield put(setFetching(false));
  }
}

export const logout = () =>
  ({
    type: 'SAGA/LOGOUT',
  } as const);

function* editProfileDataWorker(
  action: ReturnType<typeof editProfileData>,
): SagaIterator {
  yield put(setFetching(true));

  try {
    const res = yield call(authAPI.editProfile, action.payload);
    yield put(updateProfileData(res.data.updatedUser));
  } catch (error) {
    handleCatchErrorSaga(error);
  } finally {
    yield put(setFetching(false));
  }
}

export const editProfileData = (payload: EditProfileData) =>
  ({
    type: 'SAGA/EDIT_PROFILE_DATA',
    payload,
  } as const);

export function* authWatcher(): SagaIterator {
  yield takeEvery('SAGA/LOGIN', fetchLoginWorker);
  yield takeEvery('SAGA/LOGOUT', logoutWorker);
  yield takeEvery('SAGA/EDIT_PROFILE_DATA', editProfileDataWorker);
}
