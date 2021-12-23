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