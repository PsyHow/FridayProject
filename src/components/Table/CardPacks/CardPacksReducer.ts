import {cardPacksAPI} from "./CardPacksAPI";
import {AppRootStoreType, AppThunkType} from "../../../bll/Store";

export type CardPackType = {
    cardsCount:number
    created: string
    grade: number
    more_id: string
    name: "PackName2"
    path: "/def"
    private: false
    rating: number
    shots: number
    type: "pack"
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}

const initialState:Array<CardPackType>=[]

export const cardPacksReducer = (state = initialState, action: CardPacksActionsType) => {
    switch (action.type) {
        case "SET-CARD-PACKS":
            return [...action.cards]
        default:
            return state
    }
}

export const getCardPacksTC = ():AppThunkType => {
    return (dispatch, getState: ()=>AppRootStoreType) => {

        cardPacksAPI.getCardPacks()
            .then(res => {
                    dispatch(setCardPacks(res.data.cardPacks))
                })
            .catch((error) => {
            })
    }
}

export const deleteCardPackTC = (id: string):AppThunkType => {
    return (dispatch) => {
        cardPacksAPI.deleteCardPack(id)
            .then(() => {
                dispatch(getCardPacksTC())
            })
            .catch((error) => {
            })
    }
}
export const createCardPackTC = ():AppThunkType => {
    return (dispatch) => {
        cardPacksAPI.createCardPack()
            .then(() => {
                dispatch(getCardPacksTC())
            })
            .catch((error) => {
            })
    }
}

export const updateCardPackTC = (id: string, name: string):AppThunkType => {
    return (dispatch) => {
        cardPacksAPI.updateCardPack(id, name)
            .then(() => {
                dispatch(getCardPacksTC())
            })
            .catch((error) => {
            })
    }
}


const setCardPacks = (cards: Array<CardPackType>) => ({
    type: "SET-CARD-PACKS",
    cards
}as const)

type SetCardPacksActionType = ReturnType<typeof setCardPacks>

export type CardPacksActionsType=SetCardPacksActionType