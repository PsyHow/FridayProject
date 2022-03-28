import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';

import { getCards, setTotalCardsCount, updateGrade, setFetching } from 'bll/actions';
import { handleCatchErrorSaga } from 'const';
import { cardsAPI } from 'dal/api';
import { CardsData } from 'dal/api/types';

function* fetchCardsWorker({ payload }: ReturnType<typeof fetchCards>): SagaIterator {
  yield put(setFetching(true));

  try {
    const res = yield call(cardsAPI.getCards, { ...payload });
    yield put(getCards(res.data.cards));
    yield put(setTotalCardsCount(res.data.cardsTotalCount));
  } catch (error) {
    handleCatchErrorSaga(error);
  } finally {
    yield put(setFetching(false));
  }
}

export const fetchCards = (payload: CardsData) =>
  ({
    type: 'SAGA/FETCH_CARDS',
    payload,
  } as const);

function* deleteCardWorker({ payload }: ReturnType<typeof deleteCard>): SagaIterator {
  yield put(setFetching(true));

  try {
    yield call(cardsAPI.deleteCard, payload.id);
    yield put(fetchCards({ cardsPack_id: payload.token }));
  } catch (error) {
    handleCatchErrorSaga(error);
  } finally {
    yield put(setFetching(false));
  }
}

export const deleteCard = (token: string, id: string) =>
  ({
    type: 'SAGA/DELETE_CARD',
    payload: {
      token,
      id,
    },
  } as const);

function* createCardWorker({ payload }: ReturnType<typeof createCard>): SagaIterator {
  yield put(setFetching(true));

  try {
    yield call(cardsAPI.createCard, payload);
    yield put(fetchCards({ cardsPack_id: payload }));
  } catch (error) {
    handleCatchErrorSaga(error);
  } finally {
    yield put(setFetching(false));
  }
}

export const createCard = (payload: string) =>
  ({
    type: 'SAGA/CREATE_CARD',
    payload,
  } as const);

function* updateCardWorker({ payload }: ReturnType<typeof updateCard>): SagaIterator {
  yield put(setFetching(true));

  try {
    yield call(cardsAPI.updateCard, payload.id, payload.question, payload.answer);
    yield put(fetchCards({ cardsPack_id: payload.token }));
  } catch (error) {
    handleCatchErrorSaga(error);
  } finally {
    yield put(setFetching(false));
  }
}

export const updateCard = (token: string, question: string, answer: string, id: string) =>
  ({
    type: 'SAGA/UPDATE_CARD',
    payload: {
      token,
      question,
      answer,
      id,
    },
  } as const);

function* updateCardGradeWorker({
  payload,
}: ReturnType<typeof updateCardGrade>): SagaIterator {
  yield put(setFetching(true));

  try {
    const res = yield call(cardsAPI.updateCardGrade, payload.cardId, payload.grade);
    yield put(updateGrade(res.data.grade, res.data.shots, res.data.card_id));
  } catch (error) {
    handleCatchErrorSaga(error);
  } finally {
    yield put(setFetching(false));
  }
}

export const updateCardGrade = (cardId: string, grade: number) =>
  ({
    type: 'SAGA/UPDATE_CARD_GRADE',
    payload: {
      cardId,
      grade,
    },
  } as const);

export function* cardsWathcer(): SagaIterator {
  yield takeEvery('SAGA/UPDATE_CARD_GRADE', updateCardGradeWorker);
  yield takeEvery('SAGA/UPDATE_CARD', updateCardWorker);
  yield takeEvery('SAGA/CREATE_CARD', createCardWorker);
  yield takeEvery('SAGA/DELETE_CARD', deleteCardWorker);
  yield takeEvery('SAGA/FETCH_CARDS', fetchCardsWorker);
}
