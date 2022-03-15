import { CardPackType, ModeType } from 'bll/types';

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

export const setPacksPageCount = (pageCount: number) =>
  ({
    type: 'SET_PACKS_PAGE_COUNT',
    payload: { pageCount },
  } as const);

export const setPacksCurrentPage = (page: number) =>
  ({
    type: 'SET_PACKS_CURRENT_PAGE',
    payload: { page },
  } as const);

export const setTotalPacksCount = (totalPacksCount: number) =>
  ({
    type: 'SET_TOTAL_PACKS_COUNT',
    payload: { totalPacksCount },
  } as const);

export const setMode = (mode: ModeType) =>
  ({
    type: 'SET_MODE',
    payload: { mode },
  } as const);
