import {
  getPackSearch,
  getPackSorting,
  setCardPacks,
  setMinMaxCardsPackCount,
  setMode,
  setPackId,
  setPacksCurrentPageAC,
  setPacksPageCount,
  setTotalPacksCount,
} from './CardPacksActions';
import { initialState } from './CardPacksReducer';

export type SetCardPacksActionType =
  | ReturnType<typeof setCardPacks>
  | ReturnType<typeof getPackSearch>
  | ReturnType<typeof setMinMaxCardsPackCount>
  | ReturnType<typeof getPackSorting>
  | ReturnType<typeof setPackId>
  | ReturnType<typeof setPacksPageCount>
  | ReturnType<typeof setPacksCurrentPageAC>
  | ReturnType<typeof setTotalPacksCount>
  | ReturnType<typeof setMode>;
export type CardPacksActionsType = SetCardPacksActionType;

export type InitStateType = typeof initialState;

export type CardPackType = {
  cardsCount: number;
  created: string;
  grade: number;
  more_id: string;
  name: string;
  path: string;
  private: false;
  rating: number;
  shots: number;
  type: string;
  updated: string;
  user_id: string;
  user_name: string;
  __v: number;
  _id: string;
};

export type ModeType = 'ALL' | 'OWNER';
