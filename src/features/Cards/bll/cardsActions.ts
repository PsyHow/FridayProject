import { CardsType } from "./cardsTypes";


export const getCardsAC = (cards: CardsType[]) => ( {
    type: "CARDS_GET_CARDS",
    cards,
} as const )

export const getCardsIdAC = (id: string) => ( {
    type: "CARDS_GET_ID",
    id,
} as const )

export const setCardsError = (error: string) => ({
    type: "SET_CARDS_ERROR",
    error
} as const)