import { instance } from "../../../dal/apiConfing/apiConfing";
import { CardsPackResponseType } from "./CardPackApiTypes";
// cardPackAPI
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



