import axios from 'axios';

import { setCardsError } from '../../Cards/bll/cardsActions';
import { cardPacksAPI } from '../dal/CardPacksAPI';

import { setCardPacks, setTotalPacksCount } from './CardPacksActions';

import { AppRootStoreType, AppThunkType } from 'bll/Store';
import { isFetching } from 'features/authorization/dal/registrationReducer/registrationActions';

export const getCardPacksTC =
  (): AppThunkType => (dispatch, getState: () => AppRootStoreType) => {
    const state = getState();
    const { pageCount, page, sortPacks, packName, min, max, user_id } =
      state.cardPacksReducer;
    dispatch(isFetching(true));
    cardPacksAPI
      .getCardPacks({
        page,
        sortPacks,
        packName,
        min,
        max,
        user_id,
        pageCount,
      })
      .then(res => {
        dispatch(isFetching(false));
        dispatch(setCardPacks(res.data.cardPacks));
        dispatch(setTotalPacksCount(res.data.cardPacksTotalCount));
      })
      .catch(error => {
        dispatch(isFetching(false));
        if (axios.isAxiosError(error) && error.response) {
          dispatch(setCardsError(error.response.data.error));
        } else if (axios.isAxiosError(error)) {
          dispatch(setCardsError(error.message));
        }
      });
  };

export const deleteCardPackTC =
  (id: string): AppThunkType =>
  dispatch => {
    dispatch(isFetching(true));
    cardPacksAPI
      .deleteCardPack(id)
      .then(() => {
        dispatch(isFetching(false));
        dispatch(getCardPacksTC());
      })
      .catch(error => {
        dispatch(isFetching(false));
        if (axios.isAxiosError(error) && error.response) {
          dispatch(setCardsError(error.response.data.error));
        } else if (axios.isAxiosError(error)) {
          dispatch(setCardsError(error.message));
        }
      });
  };
export const createCardPackTC = (): AppThunkType => dispatch => {
  dispatch(isFetching(true));
  cardPacksAPI
    .createCardPack()
    .then(() => {
      dispatch(isFetching(false));
      dispatch(getCardPacksTC());
    })
    .catch(error => {
      dispatch(isFetching(false));
      if (axios.isAxiosError(error) && error.response) {
        dispatch(setCardsError(error.response.data.error));
      } else if (axios.isAxiosError(error)) {
        dispatch(setCardsError(error.message));
      }
    });
};
export const updateCardPackTC =
  (id: string, name: string): AppThunkType =>
  dispatch => {
    dispatch(isFetching(true));
    cardPacksAPI
      .updateCardPack(id, name)
      .then(() => {
        dispatch(isFetching(false));
        dispatch(getCardPacksTC());
      })
      .catch(error => {
        dispatch(isFetching(false));
        if (axios.isAxiosError(error) && error.response) {
          dispatch(setCardsError(error.response.data.error));
        } else if (axios.isAxiosError(error)) {
          dispatch(setCardsError(error.message));
        }
      });
  };
