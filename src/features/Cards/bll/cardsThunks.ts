import { AppRootStoreType, AppThunkType } from "bll/Store";
import { cardsAPI } from "../dal/CardsAPI";
import {
    getCardsAC,
    setCardsError,
    setTotalCardsCount, updateGradeAC,
} from "./cardsActions";
import axios from "axios";

export const getCardsTC = (token: string): AppThunkType => {
    return (dispatch, getState: () => AppRootStoreType) => {
        const state = getState();
        const { sortCards, min, max, pageCount, page, cardQuestion } = state.cards;
        cardsAPI.getCards(token, sortCards, min, max, pageCount, page, cardQuestion)
            .then((res) => {
                dispatch(getCardsAC(res.data.cards))
                dispatch(setTotalCardsCount(res.data.cardsTotalCount))
            })
            .catch((error) => {
                if (axios.isAxiosError(error) && error.response) {
                    dispatch(setCardsError(error.response.data.error));
                } else if (axios.isAxiosError(error)) {
                    dispatch(setCardsError(error.message));
                }
            })
    }
}

export const deleteCardTC = (token: string, id: string): AppThunkType => {
    return (dispatch, getState: () => AppRootStoreType) => {
        cardsAPI.deleteCard(id)
            .then(() => {
                dispatch(getCardsTC(token))
            })
            .catch((error) => {
                if (axios.isAxiosError(error) && error.response) {
                    dispatch(setCardsError(error.response.data.error));
                } else if (axios.isAxiosError(error)) {
                    dispatch(setCardsError(error.message));
                }
            })
    }
}

export const createCardTC = (token: string): AppThunkType => {
    return (dispatch) => {
        cardsAPI.createCard(token)
            .then(() => {
                dispatch(getCardsTC(token))
            })
            .catch((error) => {
                if (axios.isAxiosError(error) && error.response) {
                    dispatch(setCardsError(error.response.data.error));
                } else if (axios.isAxiosError(error)) {
                    dispatch(setCardsError(error.message));
                }
            })
    }
}

export const updateCardTC = (token: string, question: string, answer: string, id: string): AppThunkType => {
    return (dispatch) => {
        cardsAPI.updateCard(id, question, answer)
            .then(() => {
                dispatch(getCardsTC(token))
            })
            .catch((error) => {
                if (axios.isAxiosError(error) && error.response) {
                    dispatch(setCardsError(error.response.data.error));
                } else if (axios.isAxiosError(error)) {
                    dispatch(setCardsError(error.message));
                }
            })
    }
}

export const updateCardGradeTC = (cardId:string, grade:number): AppThunkType => {
    return (dispatch, getState: () => AppRootStoreType) => {
        return cardsAPI.updateCardGrade(cardId, grade)
            .then((res) => {
                dispatch(updateGradeAC(res.data.grade, res.data.shots, res.data.card_id))
            })
    }
}

