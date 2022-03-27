import axios, { AxiosResponse } from 'axios';
import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';

import { setCardPacks, setError, setFetching, setTotalPacksCount } from 'bll/actions';
import { cardPacksAPI } from 'dal/api';
import { CardPackData, CardsPackResponseType } from 'dal/api/types';

function* fetchCardPacksWorker(action: ReturnType<typeof fetchCardPacks>): SagaIterator {
  yield put(setFetching(true));

  try {
    const res: AxiosResponse<CardsPackResponseType> = yield call(
      cardPacksAPI.getCardPacks,
      action.data,
    );
    yield put(setCardPacks(res.data.cardPacks));
    yield put(setTotalPacksCount(res.data.cardPacksTotalCount));
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

export const fetchCardPacks = (data: CardPackData) =>
  ({
    type: 'SAGA/FETCH_CARD_PACKS',
    data,
  } as const);

function* deleteCardPackWorker({
  payload,
}: ReturnType<typeof deleteCardPackSaga>): SagaIterator {
  yield put(setFetching(true));

  try {
    yield call(cardPacksAPI.deleteCardPack, payload.id);
    yield put(fetchCardPacks({ user_id: payload.userId }));
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

export const deleteCardPackSaga = (id: string, userId: string) =>
  ({
    type: 'SAGA/DELETE_CARD_PACKS',
    payload: {
      id,
      userId,
    },
  } as const);

function* createCardPackWorker({
  payload,
}: ReturnType<typeof createCardPackSaga>): SagaIterator {
  yield put(setFetching(true));
  try {
    yield call(cardPacksAPI.createCardPack, payload.name);
    yield put(fetchCardPacks({ user_id: payload.userId }));
  } catch (error) {
    if (axios.isAxiosError(error) && error.response)
      yield put(setError(error.response.data.error));
    else if (axios.isAxiosError(error)) {
      yield put(setError(error.message));
    }
  } finally {
    put(setFetching(false));
  }
}

export const createCardPackSaga = (userId: string, name: string) =>
  ({
    type: 'SAGA/CREATE_CARD_PACK',
    payload: {
      userId,
      name,
    },
  } as const);

function* updateCardPackWorker(
  action: ReturnType<typeof updateCardPackSaga>,
): SagaIterator {
  yield put(setFetching(true));

  try {
    yield call(cardPacksAPI.updateCardPack, action.payload.id, action.payload.name);
    yield put(fetchCardPacks({ user_id: action.payload.userId }));
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

export const updateCardPackSaga = (id: string, name: string, userId: string) =>
  ({
    type: 'SAGA/UPDATE_TASK',
    payload: {
      id,
      name,
      userId,
    },
  } as const);

export function* cardPacksWatcher(): SagaIterator {
  yield takeEvery('SAGA/FETCH_CARD_PACKS', fetchCardPacksWorker);
  yield takeEvery('SAGA/DELETE_CARD_PACKS', deleteCardPackWorker);
  yield takeEvery('SAGA/CREATE_CARD_PACK', createCardPackWorker);
  yield takeEvery('SAGA/UPDATE_TASK', updateCardPackWorker);
}
