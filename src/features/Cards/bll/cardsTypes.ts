import { getCardsIdAC, getCardsAC } from "./cardsActions";
import { initialState } from "./cardsReducer";
import {
    GetSearchType,
    GetSortingType, SetCurrentPageType,
    SetMaxItemCountType,
    SetMinItemCountType, SetPageCountType, SetTotalItemsCountType,
} from "../../Packs/bll/CardPacksTypes";

export type InitialStateType = typeof initialState;

export type ActionCardTypes = ReturnType<typeof getCardsAC>
    | ReturnType<typeof getCardsIdAC>
    | GetSortingType
    | SetMinItemCountType
    | SetMaxItemCountType
    | SetCurrentPageType
    | SetTotalItemsCountType
    | SetPageCountType
    | GetSearchType

export type CardsType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}