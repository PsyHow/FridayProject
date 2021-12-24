import { AppRootStoreType, AppThunkType } from "bll/Store";
import { cardsAPI } from "../dal/CardsAPI";
import { getCardsAC } from "./cardsActions";
import { setTotalItemsCount } from "../../Packs/bll/CardPacksActions";

export const getCardsTC = (token: string): AppThunkType => {
    return (dispatch, getState: () => AppRootStoreType) => {
        const state = getState();
        const { sortCards, min, max, pageCount, page, cardQuestion } = state.cards;
        cardsAPI.getCards(token, sortCards, min, max, pageCount, page, cardQuestion)
            .then((res) => {
                dispatch(getCardsAC(res.data.cards))
                dispatch(setTotalItemsCount(res.data.cardsTotalCount))
            })
            .then(err => {
                console.log(err) // just a plug (fix it later)
            })
    }
}

export const deleteCardTC = (token: string, id: string): AppThunkType => {
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

export const updateCardTC = (token: string, question: string, answer: string, id: string): AppThunkType => {
    return (dispatch) => {
        cardsAPI.updateCard(id, question, answer)
            .then(() => {
                dispatch(getCardsTC(token))
            })
            .catch(err => {
                console.log(err) // just a plug (fix it later)
            })
    }
}