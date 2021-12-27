import {
    getCardsIdAC,
    getCardsAC,
    setCardsError,
    setMinMaxCardsCountAC, getCardsSearch, getCardsSorting,
} from "./cardsActions";
import { initialState } from "./cardsReducer";

import { PaginatorActionTypes } from "components/common/Paginator/paginatorTypes";

export type InitialStateType = typeof initialState;

export type ActionCardTypes = ReturnType<typeof getCardsAC>
    | ReturnType<typeof getCardsIdAC>
    | ReturnType<typeof getCardsSorting>
    | ReturnType<typeof getCardsSearch>
    | SetCardsErrorType
    | PaginatorActionTypes
    | ReturnType<typeof setMinMaxCardsCountAC>

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