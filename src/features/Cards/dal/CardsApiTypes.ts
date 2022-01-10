import { CardsType } from "../bll/cardsTypes";

export type CardsResponseType = {
    cards: CardsType[],
    cardsTotalCount: number,
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type CardsData = {
    cardsPack_id: string,
    sortCards: string,
    min: number,
    max: number,
    pageCount: number,
    page: number,
    cardQuestion: string
}