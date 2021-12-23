import { getCardsIdAC, getCardsAC } from "./cardsActions";
import { initialState } from "./cardsReducer";

export type InitialStateType = typeof initialState;

export type ActionCardTypes = ReturnType<typeof getCardsAC>
    | ReturnType<typeof getCardsIdAC>

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