import {
    getSearch, getSorting, setCardPacks, setCurrentPageAC,
    setMaxCardsCount,
    setMinCardsCount, setPageCount, setTotalItemsCount,
} from "./CardPacksActions";
import { initialState } from "./CardPacksReducer";


export type SetCardPacksActionType = ReturnType<typeof setCardPacks>
    | ReturnType<typeof setTotalItemsCount>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setPageCount>
    | ReturnType<typeof getSorting>
    | ReturnType<typeof getSearch>
    | ReturnType<typeof setMinCardsCount>
    | ReturnType<typeof setMaxCardsCount>

export type CardPacksActionsType = SetCardPacksActionType

export type InitStateType = typeof initialState

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