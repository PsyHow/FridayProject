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

export const deleteCardTC = (token: string): AppThunkType => {
    return (dispatch, getState: () => AppRootStoreType) => {
        cardsAPI.deleteCard()
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
        cardsAPI.createCard()
            .then(() => {
                dispatch(getCardsTC(token))
            })
            .catch(err => {
                console.log(err) // just a plug (fix it later)
            })
    }
}

export const updateCardTC = (token:string): AppThunkType => {
    return (dispatch) => {
        cardsAPI.updateCard()
            .then(() => {
                dispatch(getCardsTC(token))
            })
            .catch(err => {
                console.log(err) // just a plug (fix it later)
            })
    }
}