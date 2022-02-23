import { ActionCardTypes, CardsType, InitialStateType } from './cardsTypes';

export const initialState = {
  cards: [] as CardsType[],
  id: '',
  sortCards: '',
  min: 0,
  max: 6,
  pageCount: 5,
  page: 1,
  cardsTotalCount: 0,
  cardQuestion: '',
  maxGradeCount: 5,
  minGradeCount: 0,
};

export const cardsReducer = (
  state = initialState,
  action: ActionCardTypes,
): InitialStateType => {
  switch (action.type) {
    case 'CARDS_GET_CARDS':
      return { ...state, cards: action.cards };
    case 'GET_CARDS_SORTING':
      return { ...state, sortCards: action.item };
    case 'SET_CARDS_CURRENT_PAGE':
      return { ...state, page: action.page };
    case 'SET_TOTAL_CARDS_COUNT':
      return { ...state, cardsTotalCount: action.totalCardsCount };
    case 'UPDATE_GRADE':
      return {
        ...state,
        cards: state.cards.map(card => {
          if (card._id === action.id) {
            return {
              ...card,
              grade: action.grade,
              shots: action.shots,
            };
          }
          return card;
        }),
      };
    default:
      return state;
  }
};
