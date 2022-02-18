import { CardsRequest } from '../dal/CardPackApiTypes';
import { cardPacksAPI } from '../dal/CardPacksAPI';

import { setCardPacks, setTotalPacksCount } from './CardPacksActions';

import { AppThunkType } from 'bll/Store';
import { handleCatchError } from 'const';
import { setFetching } from 'features/authorization/dal/authReducer/authActions';

export const getCardPacksTC =
  (data?: CardsRequest): AppThunkType =>
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

export const deleteCardPackTC =
  (id: string): AppThunkType =>
  async dispatch => {
    dispatch(setFetching(true));

    try {
      await cardPacksAPI.deleteCardPack(id);
      dispatch(setFetching(false));
      dispatch(getCardPacksTC());
    } catch (error) {
      dispatch(setFetching(false));
      handleCatchError(error, dispatch);
    }
  };

export const createCardPackTC = (): AppThunkType => async dispatch => {
  dispatch(setFetching(true));

  try {
    await cardPacksAPI.createCardPack();
    dispatch(setFetching(false));
    dispatch(getCardPacksTC());
  } catch (error) {
    dispatch(setFetching(false));
    handleCatchError(error, dispatch);
  }
};

export const updateCardPackTC =
  (id: string, name: string): AppThunkType =>
  async dispatch => {
    dispatch(setFetching(true));

    try {
      await cardPacksAPI.updateCardPack(id, name);
      dispatch(setFetching(false));
      dispatch(getCardPacksTC());
    } catch (error) {
      dispatch(setFetching(false));
      handleCatchError(error, dispatch);
    }
  };
