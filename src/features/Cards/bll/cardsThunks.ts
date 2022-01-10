import { AppRootStoreType, AppThunkType } from "bll/Store";
import { cardsAPI } from "../dal/CardsAPI";
import {
    getCardsAC,
    setCardsError,
    setTotalCardsCount,
    updateGradeAC,
} from "./cardsActions";
import axios from "axios";
import { isFetching } from "features/authorization/dal/registrationReducer/registrationActions";

export const getCardsTC = (token: string): AppThunkType => {
    return (dispatch, getState: () => AppRootStoreType) => {
        const state = getState();
        const { sortCards, min, max, pageCount, page, cardQuestion } = state.cardsReducer;
        dispatch(isFetching(true))
        cardsAPI.getCards({
            cardsPack_id: token,
            sortCards,
            min,
            max,
            pageCount,
            page,
            cardQuestion,
        })
            .then((res) => {
                dispatch(isFetching(false))
                dispatch(getCardsAC(res.data.cards))
                dispatch(setTotalCardsCount(res.data.cardsTotalCount))
            })
            .catch((error) => {
                dispatch(isFetching(false))
                if (axios.isAxiosError(error) && error.response) {
                    dispatch(setCardsError(error.response.data.error));
                } else if (axios.isAxiosError(error)) {
                    dispatch(setCardsError(error.message));
                }
            })
    }
}

export const deleteCardTC = (token: string, id: string): AppThunkType => {
    return (dispatch) => {
        dispatch(isFetching(true))
        cardsAPI.deleteCard(id)
            .then(() => {
                dispatch(isFetching(false))
                dispatch(getCardsTC(token))
            })
            .catch((error) => {
                dispatch(isFetching(false))
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
        dispatch(isFetching(true))
        cardsAPI.createCard(token)
            .then(() => {
                dispatch(isFetching(false))
                dispatch(getCardsTC(token))
            })
            .catch((error) => {
                dispatch(isFetching(false))
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
        dispatch(isFetching(true))
        cardsAPI.updateCard(id, question, answer)
            .then(() => {
                dispatch(isFetching(false))
                dispatch(getCardsTC(token))
            })
            .catch((error) => {
                dispatch(isFetching(false))
                if (axios.isAxiosError(error) && error.response) {
                    dispatch(setCardsError(error.response.data.error));
                } else if (axios.isAxiosError(error)) {
                    dispatch(setCardsError(error.message));
                }
            })
    }
}

export const updateCardGradeTC = (cardId: string, grade: number): AppThunkType => {
    return (dispatch) => {
        dispatch(isFetching(true))
        cardsAPI.updateCardGrade(cardId, grade)
            .then((res) => {
                dispatch(isFetching(false))
                dispatch(updateGradeAC(res.data.grade, res.data.shots, res.data.card_id))
            })
    }
}

