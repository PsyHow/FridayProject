import { CardsRequest } from '../dal/CardPackApiTypes';
import { cardPacksAPI } from '../dal/CardPacksAPI';

import { setCardPacks, setTotalPacksCount } from './CardPacksActions';

import { AppRootStoreType, AppThunkType } from 'bll/Store';
import { handleCatchError } from 'const';
import { isFetching } from 'features/authorization/dal/registrationReducer/registrationActions';

export const getCardPacksTC =
  (data?: CardsRequest): AppThunkType =>
  async (dispatch, getState: () => AppRootStoreType) => {
    // const { pageCount, page, sortPacks, packName, min, max, user_id } =
    //   getState().cardPacksReducer;

    dispatch(isFetching(true));

    try {
      const res = await cardPacksAPI.getCardPacks({ ...data });
      dispatch(isFetching(false));
      dispatch(setCardPacks(res.data.cardPacks));
      dispatch(setTotalPacksCount(res.data.cardPacksTotalCount));
    } catch (error) {
      dispatch(isFetching(false));
      handleCatchError(error, dispatch);
    }
  };

export const deleteCardPackTC =
  (id: string): AppThunkType =>
  async dispatch => {
    dispatch(isFetching(true));

    try {
      await cardPacksAPI.deleteCardPack(id);
      dispatch(isFetching(false));
      dispatch(getCardPacksTC());
    } catch (error) {
      dispatch(isFetching(false));
      handleCatchError(error, dispatch);
    }
  };

export const createCardPackTC = (): AppThunkType => async dispatch => {
  dispatch(isFetching(true));

  try {
    await cardPacksAPI.createCardPack();
    dispatch(isFetching(false));
    dispatch(getCardPacksTC());
  } catch (error) {
    dispatch(isFetching(false));
    handleCatchError(error, dispatch);
  }
};

export const updateCardPackTC =
  (id: string, name: string): AppThunkType =>
  async dispatch => {
    dispatch(isFetching(true));

    try {
      await cardPacksAPI.updateCardPack(id, name);
      dispatch(isFetching(false));
      dispatch(getCardPacksTC());
    } catch (error) {
      dispatch(isFetching(false));
      handleCatchError(error, dispatch);
    }
  };
