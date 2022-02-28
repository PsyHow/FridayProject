import { CardsData, CardsResponseType } from 'dal/api/types';
import { instance } from 'dal/apiConfing';

export const cardsAPI = {
  getCards(data: CardsData) {
    return instance.get<CardsResponseType>(`cards/card`, {
      params: {
        ...data,
      },
    });
  },

  deleteCard(id: string) {
    return instance.delete(`cards/card`, { params: { id } });
  },

  createCard(cardsPack_id: string) {
    return instance.post(`cards/card`, {
      card: {
        cardsPack_id,
        question: 'the answer to the main question?',
        answer: '42',
      },
    });
  },

  updateCard(id: string, question: string, answer: string) {
    return instance.put(`cards/card`, {
      card: {
        _id: id,
        question,
        answer,
      },
    });
  },

  updateCardGrade(id: string, grade: number) {
    return instance.put(`cards/grade`, {
      card_id: id,
      grade,
    });
  },
};
