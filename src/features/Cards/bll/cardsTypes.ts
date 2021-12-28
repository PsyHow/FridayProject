import {
    getCardsAC,
    getCardsIdAC,
    getCardsSearch,
    getCardsSorting,
    setCardsCurrentPageAC,
    setCardsError,
    setCardsPageCount,
    setMinMaxCardsCountAC,
    setTotalCardsCount,
} from "./cardsActions";
import { initialState } from "./cardsReducer";

export type InitialStateType = typeof initialState;

export type ActionCardTypes = ReturnType<typeof getCardsAC>
    | ReturnType<typeof getCardsIdAC>
    | ReturnType<typeof getCardsSorting>
    | ReturnType<typeof getCardsSearch>
    | ReturnType<typeof setCardsPageCount>
    | SetCardsErrorType
    | ReturnType<typeof setMinMaxCardsCountAC>
    | ReturnType<typeof setCardsCurrentPageAC>
    | ReturnType<typeof setTotalCardsCount>

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