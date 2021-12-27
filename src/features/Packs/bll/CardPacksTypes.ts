import {
    getPackSearch, getPackSorting,
    setCardPacks, setMinMaxCardsPackCount,
    setPackId,
} from "./CardPacksActions";
import { initialState } from "./CardPacksReducer";
import { SetCardsErrorType } from "../../Cards/bll/cardsTypes";
import { PaginatorActionTypes } from "components/common/Paginator/paginatorTypes";


export type SetCardPacksActionType = ReturnType<typeof setCardPacks>
    | ReturnType<typeof getPackSearch>
    | ReturnType<typeof setMinMaxCardsPackCount>
    | ReturnType<typeof getPackSorting>
    | SetCardsErrorType
    | ReturnType<typeof setPackId>
    | PaginatorActionTypes


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