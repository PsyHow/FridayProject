import { CardPacksActionsType } from './types';

import { CardPackType, ModeType } from 'bll/types';

const initialState = {
  cardPacks: [] as CardPackType[],
  cardPacksTotalCount: 0,
  maxCardsCount: 103,
  minCardsCount: 0,
  page: 1,
  pageCount: 5,
  sortPacks: '',
  packName: '',
  min: 0,
  max: 103,
  error: '',
  user_id: '',
  mode: 'ALL' as ModeType,
};

type InitStateType = typeof initialState;

export const cardPacksReducer = (
  state = initialState,
  action: CardPacksActionsType,
): InitStateType => {
  switch (action.type) {
    case 'SET-CARD-PACKS':
      return { ...state, cardPacks: action.payload.cards };
    case 'SET_TOTAL_PACKS_COUNT':
      return { ...state, cardPacksTotalCount: action.payload.totalPacksCount };
    case 'SET_PACKS_CURRENT_PAGE':
      return { ...state, page: action.payload.page };
    case 'SET_PACKS_PAGE_COUNT':
      return { ...state, pageCount: action.payload.pageCount };
    case 'GET_PACK_SORTING':
      return { ...state, sortPacks: action.payload.item };
    case 'SET_MODE':
      return { ...state, mode: action.payload.mode };
    default:
      return state;
  }
};
