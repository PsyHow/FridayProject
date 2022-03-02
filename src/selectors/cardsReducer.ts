import { AppRootStoreType } from 'bll/Store';
import { CardsType } from 'bll/types';

export const selectCards = (state: AppRootStoreType): CardsType[] =>
  state.cardsReducer.cards;
export const selectCardsTotalCount = (state: AppRootStoreType): number =>
  state.cardsReducer.cardsTotalCount;
export const selectCardsCurrentPage = (state: AppRootStoreType): number =>
  state.cardsReducer.page;
export const selectCardsPageCount = (state: AppRootStoreType): number =>
  state.cardsReducer.pageCount;
export const selectCardId = (state: AppRootStoreType): string => state.cardsReducer.id;
