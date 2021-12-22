import axios from "axios";
import { CardPackType } from "../CardPacks/CardPacksReducer";


const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:7542/2.0/",
})

export const cardPacksAPI = {
    getCardPacks(pageCount:number, page:number, sortPacks:any, packName:string){
       return instance.get<CardsResponseType>
       (`cards/pack`, {params: {pageCount, page, sortPacks, packName}})
    },
    deleteCardPack(id:string){
        return instance.delete(`cards/pack?id=${id}`)
    },
    createCardPack(){
        return instance.post(`cards/pack`, {cardsPack: {name: 'dfdsdf'}})
    },
    updateCardPack(id: string, name: string){
        return instance.put(`cards/pack`, {cardsPack: {_id: id, name}})
    }
}

export type CardsResponseType = {
    cardPacks: CardPackType[],
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}