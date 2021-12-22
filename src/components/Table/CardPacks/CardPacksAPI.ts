import axios from "axios";
import { CardPackType } from "./CardPacksReducer";
import { CardsType } from "../../../bll/cardReducer";


const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:7542/2.0/",
})

export const cardPacksAPI = {
    getCardPacks(pageCount: number, page: number, sortPacks: any, packName: string, min: string, max: string) {
        return instance.get<CardsPackResponseType>
        (`cards/pack`, { params: { pageCount, page, sortPacks, packName, min, max } })
    },
    deleteCardPack(id: string) {
        return instance.delete(`cards/pack?id=${ id }`)
    },
    createCardPack() {
        return instance.post(`cards/pack`, { cardsPack: { name: 'dfdsdf' } })
    },
    updateCardPack(id: string, name: string) {
        return instance.put(`cards/pack`, { cardsPack: { _id: id, name } })
    },
}

export const cardAPI = {
    getCards(cardsPack_id: string) {
        return instance.get<CardsResponseType>(`cards/card`, { params: { cardsPack_id } })
    },
    deleteCard() {
        return instance.delete(`cards/card`)
    },
    createCard() {
        return instance.post(`cards/card`, {
            card: {
                question: 'the answer to the main question?',
                answer: '42',
            },
        })
    },
    updateCard() {
        return instance.put(`cards/card`)
    },
}

export type CardsPackResponseType = {
    cardPacks: CardPackType[],
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export type CardsResponseType = {
    cards: CardsType[],
    cardsTotalCount: number,
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}