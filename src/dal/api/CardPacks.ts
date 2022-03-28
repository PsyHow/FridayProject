import { CardsPackResponseType, CardPackData } from 'dal/api/types';
import { instance } from 'dal/apiConfing';

export const cardPacksAPI = {
  getCardPacks(data: CardPackData) {
    return instance.get<CardsPackResponseType>(`cards/pack`, {
      params: {
        ...data,
      },
    });
  },
  deleteCardPack(id: string) {
    return instance.delete(`cards/pack?id=${id}`);
  },
  createCardPack(name: string) {
    return instance.post(`cards/pack`, { cardsPack: { name } });
  },
  updateCardPack(id: string, name: string) {
    return instance.put(`cards/pack`, { cardsPack: { _id: id, name } });
  },
};
