import {
  getCardsAC,
  getCardsIdAC,
  getCardsSearch,
  getCardsSorting,
  setCardsCurrentPageAC,
  setCardsError,
  setCardsPageCount,
  setMinMaxCardsCountAC,
  setTotalCardsCount,
  updateGradeAC,
} from './cardsActions';
import { initialState } from './cardsReducer';

export type InitialStateType = typeof initialState;

export type ActionCardTypes =
  | ReturnType<typeof getCardsAC>
  | ReturnType<typeof getCardsIdAC>
  | ReturnType<typeof getCardsSorting>
  | ReturnType<typeof getCardsSearch>
  | ReturnType<typeof setCardsPageCount>
  | SetCardsErrorType
  | ReturnType<typeof setMinMaxCardsCountAC>
  | ReturnType<typeof setCardsCurrentPageAC>
  | ReturnType<typeof setTotalCardsCount>
  | ReturnType<typeof updateGradeAC>;

export type SetCardsErrorType = ReturnType<typeof setCardsError>;

export type CardsType = {
  cardsPack_id: string;
  grade: number;
  question: string;
  shots: number;
  user_id: string;
  updated: string;
  __v: number;
  _id: string;
  type: string;
  answer: string;
  created: string;
  rating: number;
};
