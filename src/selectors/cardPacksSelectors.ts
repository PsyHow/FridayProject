import { AppRootStoreType } from 'bll/Store';
import { CardPackType, ModeType } from 'features/Packs/bll/CardPacksTypes';

export const selectCardPackTotalCount = (state: AppRootStoreType): number =>
  state.cardPacksReducer.cardPacksTotalCount;

export const selectPackPage = (state: AppRootStoreType): number =>
  state.cardPacksReducer.page;

export const selectPackPageCount = (state: AppRootStoreType): number =>
  state.cardPacksReducer.pageCount;

export const selectCardPacks = (state: AppRootStoreType): CardPackType[] =>
  state.cardPacksReducer.cardPacks;

export const selectCardMinValue = (state: AppRootStoreType): number =>
  state.cardPacksReducer.min;

export const selectCardMaxValue = (state: AppRootStoreType): number =>
  state.cardPacksReducer.max;

export const selectMode = (state: AppRootStoreType): ModeType =>
  state.cardPacksReducer.mode;
