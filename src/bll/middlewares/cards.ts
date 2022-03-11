import { getCards, setTotalCardsCount, updateGrade, setFetching } from 'bll/actions';
import { AppThunkType } from 'bll/Store';
import { handleCatchError } from 'const';
import { cardsAPI } from 'dal/api';
import { CardsData } from 'dal/api/types';

export const fetchCards =
  (data?: CardsData): AppThunkType =>
  async dispatch => {
    dispatch(setFetching(true));

    try {
      const res = await cardsAPI.getCards({
        ...data,
      });
      dispatch(getCards(res.data.cards));
      dispatch(setTotalCardsCount(res.data.cardsTotalCount));
    } catch (error) {
      handleCatchError(error, dispatch);
    } finally {
      dispatch(setFetching(false));
    }
  };

export const deleteCard =
  (token: string, id: string): AppThunkType =>
  async dispatch => {
    dispatch(setFetching(true));

    try {
      await cardsAPI.deleteCard(id);
      dispatch(fetchCards({ cardsPack_id: token }));
    } catch (error) {
      handleCatchError(error, dispatch);
    } finally {
      dispatch(setFetching(false));
    }
  };

export const createCard =
  (token: string): AppThunkType =>
  async dispatch => {
    dispatch(setFetching(true));

    try {
      await cardsAPI.createCard(token);
      dispatch(fetchCards({ cardsPack_id: token }));
    } catch (error) {
      handleCatchError(error, dispatch);
    } finally {
      dispatch(setFetching(false));
    }
  };

export const updateCard =
  (token: string, question: string, answer: string, id: string): AppThunkType =>
  async dispatch => {
    dispatch(setFetching(true));

    try {
      await cardsAPI.updateCard(id, question, answer);
      dispatch(fetchCards({ cardsPack_id: token }));
    } catch (error) {
      handleCatchError(error, dispatch);
    } finally {
      dispatch(setFetching(false));
    }
  };

export const updateCardGrade =
  (cardId: string, grade: number): AppThunkType =>
  async dispatch => {
    dispatch(setFetching(true));

    try {
      const res = await cardsAPI.updateCardGrade(cardId, grade);
      dispatch(updateGrade(res.data.grade, res.data.shots, res.data.card_id));
    } catch (error) {
      handleCatchError(error, dispatch);
    } finally {
      dispatch(setFetching(false));
    }
  };
