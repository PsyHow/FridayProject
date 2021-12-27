import { getCardsIdAC, getCardsAC, setCardsError } from "./cardsActions";
import { initialState } from "./cardsReducer";
import {
    GetSearchType,
    GetSortingType,
    SetMaxItemCountType,
    SetMinItemCountType,
} from "../../Packs/bll/CardPacksTypes";
import { PaginatorActionTypes } from "bll/paginatorReducer/paginatorTypes";

export type InitialStateType = typeof initialState;

export type ActionCardTypes = ReturnType<typeof getCardsAC>
    | ReturnType<typeof getCardsIdAC>
    | GetSortingType
    | SetMinItemCountType
    | SetMaxItemCountType
    | GetSearchType
    | SetCardsErrorType
    | PaginatorActionTypes

export type SetCardsErrorType = ReturnType<typeof setCardsError>

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