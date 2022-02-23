import { CardsType } from './cardsTypes';

export const getCardsAC = (cards: CardsType[]) =>
  ({
    type: 'CARDS_GET_CARDS',
    cards,
  } as const);

export const getCardsSorting = (item: any) =>
  ({
    type: 'GET_CARDS_SORTING',
    item,
  } as const);

export const setCardsCurrentPageAC = (page: number) =>
  ({
    type: 'SET_CARDS_CURRENT_PAGE',
    page,
  } as const);

export const setTotalCardsCount = (totalCardsCount: number) =>
  ({
    type: 'SET_TOTAL_CARDS_COUNT',
    totalCardsCount,
  } as const);

export const updateGradeAC = (grade: number, shots: number, id: string) =>
  ({
    type: 'UPDATE_GRADE',
    grade,
    shots,
    id,
  } as const);
