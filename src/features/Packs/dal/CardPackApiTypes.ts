import { CardPackType } from "../bll/CardPacksTypes";

export type CardsPackResponseType = {
    cardPacks: CardPackType[],
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}