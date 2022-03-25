import axios, { AxiosResponse } from 'axios';
import {
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  takeEvery,
} from 'redux-saga/effects';

import { setCardPacks, setTotalPacksCount, setFetching, setError } from 'bll/actions';
import { AppActionsType, AppThunkType } from 'bll/Store';
import { handleCatchError } from 'const';
import { cardPacksAPI } from 'dal/api';
import { CardPackData, CardsPackResponseType } from 'dal/api/types';

export const fetchCardPacks =
  (data?: CardPackData): AppThunkType =>
  async dispatch => {
    dispatch(setFetching(true));

    try {
      const res = await cardPacksAPI.getCardPacks({ ...data });
      dispatch(setCardPacks(res.data.cardPacks));
      dispatch(setTotalPacksCount(res.data.cardPacksTotalCount));
    } catch (error) {
      handleCatchError(error, dispatch);
    } finally {
      dispatch(setFetching(false));
    }
  };

export function* fetchCardPacksWorker(
  action: ReturnType<typeof fetchCardPacksSaga>,
): Generator<
  PutEffect<AppActionsType> | CallEffect<AxiosResponse<CardsPackResponseType>>,
  void,
  AxiosResponse<CardsPackResponseType>
> {
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

export const fetchCardPacksSaga = (data: CardPackData) =>
  ({
    type: 'FETCH_CARD_PACKS',
    data,
  } as const);

export function* cardPacksWatcher(): Generator<ForkEffect<never>, void, never> {
  yield takeEvery('FETCH_CARD_PACKS', fetchCardPacksWorker);
}

export const deleteCardPack =
  (id: string, userId: string): AppThunkType =>
  async dispatch => {
    dispatch(setFetching(true));

    try {
      await cardPacksAPI.deleteCardPack(id);
      dispatch(fetchCardPacks({ user_id: userId }));
    } catch (error) {
      handleCatchError(error, dispatch);
    } finally {
      dispatch(setFetching(false));
    }
  };

export const createCardPack =
  (userId: string, name: string): AppThunkType =>
  async dispatch => {
    dispatch(setFetching(true));

    try {
      await cardPacksAPI.createCardPack(name);
      dispatch(fetchCardPacks({ user_id: userId }));
    } catch (error) {
      handleCatchError(error, dispatch);
    } finally {
      dispatch(setFetching(false));
    }
  };

export const updateCardPack =
  (id: string, name: string, userId: string): AppThunkType =>
  async dispatch => {
    dispatch(setFetching(true));

    try {
      await cardPacksAPI.updateCardPack(id, name);
      dispatch(fetchCardPacks({ user_id: userId }));
    } catch (error) {
      handleCatchError(error, dispatch);
    } finally {
      dispatch(setFetching(false));
    }
  };
