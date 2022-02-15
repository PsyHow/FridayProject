import { cardsAPI } from '../dal/CardsAPI';

import { getCardsAC, setTotalCardsCount, updateGradeAC } from './cardsActions';

import { AppRootStoreType, AppThunkType } from 'bll/Store';
import { handleCatchError } from 'const';
import { isFetching } from 'features/authorization/dal/registrationReducer/registrationActions';

export const getCardsTC =
  (token: string): AppThunkType =>
  async (dispatch, getState: () => AppRootStoreType) => {
    const { sortCards, min, max, pageCount, page, cardQuestion } =
      getState().cardsReducer;

    dispatch(isFetching(true));

    try {
      const res = await cardsAPI.getCards({
        cardsPack_id: token,
        sortCards,
        min,
        max,
        pageCount,
        page,
        cardQuestion,
      });
      dispatch(isFetching(false));
      dispatch(getCardsAC(res.data.cards));
      dispatch(setTotalCardsCount(res.data.cardsTotalCount));
    } catch (error) {
      dispatch(isFetching(false));
      handleCatchError(error, dispatch);
    }
  };

export const deleteCardTC =
  (token: string, id: string): AppThunkType =>
  async dispatch => {
    dispatch(isFetching(true));

    try {
      await cardsAPI.deleteCard(id);
      dispatch(isFetching(false));
      dispatch(getCardsTC(token));
    } catch (error) {
      dispatch(isFetching(false));
      handleCatchError(error, dispatch);
    }
  };

export const createCardTC =
  (token: string): AppThunkType =>
  async dispatch => {
    dispatch(isFetching(true));

    try {
      await cardsAPI.createCard(token);
      dispatch(isFetching(false));
      dispatch(getCardsTC(token));
    } catch (error) {
      dispatch(isFetching(false));
      handleCatchError(error, dispatch);
    }
  };

export const updateCardTC =
  (token: string, question: string, answer: string, id: string): AppThunkType =>
  async dispatch => {
    dispatch(isFetching(true));

    try {
      await cardsAPI.updateCard(id, question, answer);
      dispatch(isFetching(false));
      dispatch(getCardsTC(token));
    } catch (error) {
      dispatch(isFetching(false));
      handleCatchError(error, dispatch);
    }
  };

export const updateCardGradeTC =
  (cardId: string, grade: number): AppThunkType =>
  async dispatch => {
    dispatch(isFetching(true));

    try {
      const res = await cardsAPI.updateCardGrade(cardId, grade);
      dispatch(isFetching(false));
      dispatch(updateGradeAC(res.data.grade, res.data.shots, res.data.card_id));
    } catch (error) {
      dispatch(isFetching(false));
      handleCatchError(error, dispatch);
    }
  };
