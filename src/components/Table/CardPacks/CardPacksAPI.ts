import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:7542/2.0/",
})

export const cardPacksAPI = {
    getCardPacks(){
       return instance.get(`cards/pack`, {params: {pageCount:12}})
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