import { setCardPacks, setTotalPacksCount, setFetching } from 'bll/actions';
import { AppThunkType } from 'bll/Store';
import { handleCatchError } from 'const';
import { cardPacksAPI } from 'dal/api';
import { CardPackData } from 'dal/api/types';

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
