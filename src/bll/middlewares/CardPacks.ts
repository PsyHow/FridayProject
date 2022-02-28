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
      dispatch(setFetching(false));
      dispatch(setCardPacks(res.data.cardPacks));
      dispatch(setTotalPacksCount(res.data.cardPacksTotalCount));
    } catch (error) {
      dispatch(setFetching(false));
      handleCatchError(error, dispatch);
    }
  };

export const deleteCardPack =
  (id: string, userId: string): AppThunkType =>
  async dispatch => {
    dispatch(setFetching(true));

    try {
      await cardPacksAPI.deleteCardPack(id);
      dispatch(setFetching(false));
      dispatch(fetchCardPacks({ user_id: userId }));
    } catch (error) {
      dispatch(setFetching(false));
      handleCatchError(error, dispatch);
    }
  };

export const createCardPack =
  (userId: string): AppThunkType =>
  async dispatch => {
    dispatch(setFetching(true));

    try {
      await cardPacksAPI.createCardPack();
      dispatch(setFetching(false));
      dispatch(fetchCardPacks({ user_id: userId }));
    } catch (error) {
      dispatch(setFetching(false));
      handleCatchError(error, dispatch);
    }
  };

export const updateCardPack =
  (id: string, name: string, userId: string): AppThunkType =>
  async dispatch => {
    dispatch(setFetching(true));

    try {
      await cardPacksAPI.updateCardPack(id, name);
      dispatch(setFetching(false));
      dispatch(fetchCardPacks({ user_id: userId }));
    } catch (error) {
      dispatch(setFetching(false));
      handleCatchError(error, dispatch);
    }
  };
