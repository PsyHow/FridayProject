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
    min: 0,
    max: 103,
    error: '',
    user_id: '',
}

export const cardPacksReducer =
    (state = initialState, action: CardPacksActionsType): InitStateType => {
        switch (action.type) {
            case "SET-CARD-PACKS":
                return { ...state, cardPacks: action.cards }
            case "SET_TOTAL_PACKS_COUNT":
                return { ...state, cardPacksTotalCount: action.totalPacksCount }
            case "SET_PACKS_CURRENT_PAGE":
                return { ...state, page: action.page }
            case "SET_PACKS_PAGE_COUNT":
                return { ...state, pageCount: action.pageCount }
            case "GET_PACK_SORTING":
                return { ...state, sortPacks: action.item }
            case "GET_PACK_SEARCH":
                return { ...state, packName: action.value }
            case "SET_MIN_MAX_CARDS_PACK_COUNT":
                return { ...state, min: action.min, max: action.max}
            case "SET_CARDS_ERROR":
                return { ...state, error: action.error}
            case "SET_PACK_ID":
                return { ...state, user_id: action.id}
            default:
                return state
        }
    }





