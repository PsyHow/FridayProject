import { CardPackType } from './CardPacksTypes';

export const setCardPacks = (cards: CardPackType[]) =>
  ({
    type: 'SET-CARD-PACKS',
    payload: { cards },
  } as const);

export const getPackSorting = (item: any) =>
  ({
    type: 'GET_PACK_SORTING',
    payload: { item },
  } as const);

export const getPackSearch = (value: string) =>
  ({
    type: 'GET_PACK_SEARCH',
    payload: { value },
  } as const);

export const setMinMaxCardsPackCount = (min: number, max: number) =>
  ({
    type: 'SET_MIN_MAX_CARDS_PACK_COUNT',
    payload: { min, max },
  } as const);

export const setPackId = (id: string) =>
  ({
    type: 'SET_PACK_ID',
    payload: { id },
  } as const);

export const setPacksPageCount = (pageCount: number) =>
  ({
    type: 'SET_PACKS_PAGE_COUNT',
    payload: { pageCount },
  } as const);

export const setPacksCurrentPageAC = (page: number) =>
  ({
    type: 'SET_PACKS_CURRENT_PAGE',
    payload: { page },
  } as const);

export const setTotalPacksCount = (totalPacksCount: number) =>
  ({
    type: 'SET_TOTAL_PACKS_COUNT',
    payload: { totalPacksCount },
  } as const);
