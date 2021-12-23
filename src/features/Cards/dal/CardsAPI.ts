import { instance } from "dal/apiConfing/apiConfing";
import { CardsResponseType } from "./CardsApiTypes";

export const cardsAPI = {
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