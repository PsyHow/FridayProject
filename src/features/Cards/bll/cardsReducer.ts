import { ActionCardTypes, CardsType, InitialStateType } from "./cardsTypes";

export const initialState = {
    cards: [] as CardsType[],
    id: "",
    sortCards: "",
    min: '0',
    max: '5',
    pageCount: 3,
    page: 1,
    cardsTotalCount: 0,
    cardQuestion: '',
}

export const cardsReducer = (state = initialState, action: ActionCardTypes): InitialStateType => {
    switch (action.type) {
        case "CARD_GET_CARDS":
            return { ...state, cards: action.cards }
        case "CARD_GET_ID":
            return { ...state, id: action.id }
        case "SORTING":
            return { ...state, sortCards: action.item }
        case "SET_MIN_CARDS_COUNT":
            return { ...state, min: action.min }
        case "SET_MAX_CARDS_COUNT":
            return { ...state, max: action.max }
        case "PAGINATOR/SET_CURRENT_PAGE":
            return { ...state, page: action.page }
        case "PAGINATOR/SET_TOTAL_ITEMS_COUNT":
            return { ...state, cardsTotalCount: action.totalItemsCount }
        case "PAGINATOR/SET_PAGE_COUNT":
            return { ...state, pageCount: action.pageCount }
        case "SEARCH":
            return { ...state, cardQuestion: action.value }
        default:
            return state;
    }
}



