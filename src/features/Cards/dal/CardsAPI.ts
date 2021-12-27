import { instance } from "dal/apiConfing/apiConfing";
import { CardsResponseType } from "./CardsApiTypes";

export const cardsAPI = {
    getCards(cardsPack_id: string, sortCards: string, min:
        number, max: number, pageCount: number, page: number, cardQuestion: string) {
        return instance.get<CardsResponseType>(`cards/card`, {
            params: {
                cardsPack_id,
                sortCards,
                min,
                max,
                pageCount,
                page,
                cardQuestion,
            },
        })
    },
    deleteCard(id: string) {
        return instance.delete(`cards/card`, { params: { id } })
    },
    createCard(cardsPack_id: string) {
        return instance.post(`cards/card`, {
            card: {
                cardsPack_id,
                question: "the answer to the main question?",
                answer: "42",
            },
        })
    },
    updateCard(id: string, question: string, answer: string) {
        return instance.put(`cards/card`, {
            card: {
                _id: id,
                question,
                answer,
            },
        })
    },
}