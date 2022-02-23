import {
  CardPacksActionsType,
  CardPackType,
  InitStateType,
  ModeType,
} from './CardPacksTypes';

export const initialState = {
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
    case 'GET_PACK_SEARCH':
      return { ...state, packName: action.payload.value };
    case 'SET_MIN_MAX_CARDS_PACK_COUNT':
      return { ...state, min: action.payload.min, max: action.payload.max };
    case 'SET_MODE':
      return { ...state, mode: action.payload.mode };
    case 'SET_PACK_ID':
      return { ...state, user_id: action.payload.id };
    default:
      return state;
  }
};
