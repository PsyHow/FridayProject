import { cardPacksAPI } from "./CardPacksAPI";
import { AppRootStoreType, AppThunkType } from "../../../bll/Store";

export type CardPackType = {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: "PackName2"
    path: "/def"
    private: false
    rating: number
    shots: number
    type: "pack"
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}

const initialState = {
    cardPacks: [] as CardPackType[],
    cardPacksTotalCount: 0,
    maxCardsCount: 103,
    minCardsCount: 0,
    page: 1,
    pageCount: 5,
    sortPacks: "",
    packName: "",
    min: "0",
    max: "103",
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
                return { ...state, sortPacks: action.sortPack }
            case "SEARCH":
                return { ...state, packName: action.packName }
            case "SET_MAX_CARDS_COUNT":
                return { ...state, max: action.max }
            case "SET_MIN_CARDS_COUNT":
                return { ...state, min: action.min }
            default:
                return state
        }
    }

export const getCardPacksTC = (): AppThunkType => {
    return (dispatch, getState: () => AppRootStoreType) => {
        const state = getState();
        const { pageCount, page, sortPacks, packName, min, max } = state.cards
        cardPacksAPI.getCardPacks(pageCount, page, sortPacks, packName, min, max)
            .then(res => {
                dispatch(setCardPacks(res.data.cardPacks))
                dispatch(setTotalItemsCount(res.data.cardPacksTotalCount))
            })
            .catch((error) => {
            })
    }
}

export const deleteCardPackTC = (id: string): AppThunkType => {
    return (dispatch) => {
        cardPacksAPI.deleteCardPack(id)
            .then(() => {
                dispatch(getCardPacksTC())
            })
            .catch((error) => {
            })
    }
}
export const createCardPackTC = (): AppThunkType => {
    return (dispatch) => {
        cardPacksAPI.createCardPack()
            .then(() => {
                dispatch(getCardPacksTC())
            })
            .catch((error) => {
            })
    }
}

export const updateCardPackTC = (id: string, name: string): AppThunkType => {
    return (dispatch) => {
        cardPacksAPI.updateCardPack(id, name)
            .then(() => {
                dispatch(getCardPacksTC())
            })
            .catch((error) => {
            })
    }
}


const setCardPacks = (cards: Array<CardPackType>) => ( {
    type: "SET-CARD-PACKS",
    cards,
} as const )

export const setTotalItemsCount = (totalItemsCount: number) => ( {
    type: "PAGINATOR/SET_TOTAL_ITEMS_COUNT",
    totalItemsCount,
} as const )

export const setCurrentPageAC = (page: number) => ( {
    type: "PAGINATOR/SET_CURRENT_PAGE",
    page,
} as const )

export const setPageCount = (pageCount: number) => ( {
    type: "PAGINATOR/SET_PAGE_COUNT",
    pageCount,
} as const )

export const getSorting = (sortPack: any) => ( {
    type: "SORTING",
    sortPack,
} as const )

export const getSearch = (packName: string) => ( {
    type: "SEARCH",
    packName,
} as const )

export const setMinCardsCount = (min: string) => ( {
    type: "SET_MIN_CARDS_COUNT",
    min
} as const )

export const setMaxCardsCount = (max: string) => ( {
    type: "SET_MAX_CARDS_COUNT",
    max,
} as const )

type SetCardPacksActionType = ReturnType<typeof setCardPacks>
    | ReturnType<typeof setTotalItemsCount>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setPageCount>
    | ReturnType<typeof getSorting>
    | ReturnType<typeof getSearch>
    | ReturnType<typeof setMinCardsCount>
    | ReturnType<typeof setMaxCardsCount>

export type CardPacksActionsType = SetCardPacksActionType

type InitStateType = typeof initialState