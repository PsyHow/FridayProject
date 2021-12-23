import { AppRootStoreType, AppThunkType } from "bll/Store";
import { cardsAPI } from "../dal/CardsAPI";
import { getCardsAC } from "./cardsActions";

export const getCardsTC = (token: string): AppThunkType => {
    return (dispatch, getState: () => AppRootStoreType) => {
        cardsAPI.getCards(token)
            .then((res) => {
                dispatch(getCardsAC(res.data.cards))
            })
            .then(err => {
                console.log(err) // just a plug (fix it later)
            })
    }
}

export const deleteCardTC = (token:string,id:string): AppThunkType => {
    return (dispatch, getState: () => AppRootStoreType) => {
        cardsAPI.deleteCard(id)
            .then(() => {
                dispatch(getCardsTC(token))
            })
            .then(err => {
                console.log(err) // just a plug (fix it later)
            })
    }
}

export const createCardTC = (token: string): AppThunkType => {
    return (dispatch) => {
        cardsAPI.createCard(token)
            .then(() => {
                dispatch(getCardsTC(token))
            })
            .catch(err => {
                console.log(err) // just a plug (fix it later)
            })
    }
}

export const updateCardTC = (token:string, question:string, answer:string, id:string): AppThunkType => {
    return (dispatch) => {
        cardsAPI.updateCard(id, question,answer)
            .then(() => {
                dispatch(getCardsTC(token))
            })
            .catch(err => {
                console.log(err) // just a plug (fix it later)
            })
    }
}