import { CardsType } from "./cardsTypes";


export const getCardsAC = (cards: CardsType[]) => ( {
    type: "CARD_GET_CARDS",
    cards,
} as const )

export const getCardsIdAC = (id: string) => ( {
    type: "CARD_GET_ID",
    id,
} as const )