import { CardPacksActionsType, CardPackType, InitStateType } from "./CardPacksTypes";

export const initialState = {
    cardPacks: [] as CardPackType[],
    cardPacksTotalCount: 0,
    maxCardsCount: 103,
    minCardsCount: 0,
    page: 1,
    pageCount: 5,
    sortPacks: "",
    packName: "",
    min: '0',
    max: '103',
}

export const cardPacksReducer =
    (state = initialState, action: CardPacksActionsType): InitStateType => {
        switch (action.type) {
            case "SET-CARD-PACKS":
                return { ...state, cardPacks: action.cards }
            case "PAGINATOR/SET_TOTAL_ITEMS_COUNT":
                return { ...state, cardPacksTotalCount: action.totalItemsCount }
            case "PAGINATOR/SET_CURRENT_PAGE":
                return { ...state, page: action.page }
            case "PAGINATOR/SET_PAGE_COUNT":
                return { ...state, pageCount: action.pageCount }
            case "SORTING":
                return { ...state, sortPacks: action.item }
            case "SEARCH":
                return { ...state, packName: action.value }
            case "SET_MAX_ITEM_COUNT":
                return { ...state, max: action.max }
            case "SET_MIN_ITEM_COUNT":
                return { ...state, min: action.min }
            default:
                return state
        }
    }





