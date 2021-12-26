import {
    getSearch,
    getSorting,
    setCardPacks,
    setCurrentPageAC,
    setMaxItemsCount,
    setMinItemsCount, setPackId,
    setPageCount,
    setTotalItemsCount,
} from "./CardPacksActions";
import { initialState } from "./CardPacksReducer";
import { SetCardsErrorType } from "../../Cards/bll/cardsTypes";


export type SetCardPacksActionType = ReturnType<typeof setCardPacks>
    | SetTotalItemsCountType
    | SetCurrentPageType
    | SetPageCountType
    | GetSearchType
    | SetMinItemCountType
    | SetMaxItemCountType
    | GetSortingType
    | SetCardsErrorType
    | ReturnType<typeof setPackId>

export type GetSearchType = ReturnType<typeof getSearch>
export type SetPageCountType = ReturnType<typeof setPageCount>
export type SetTotalItemsCountType = ReturnType<typeof setTotalItemsCount>
export type SetCurrentPageType = ReturnType<typeof setCurrentPageAC>
export type GetSortingType = ReturnType<typeof getSorting>
export type SetMinItemCountType = ReturnType<typeof setMinItemsCount>
export type SetMaxItemCountType = ReturnType<typeof setMaxItemsCount>

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