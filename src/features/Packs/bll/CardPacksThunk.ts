import { AppRootStoreType, AppThunkType } from "bll/Store";
import { setCardPacks, setTotalPacksCount } from "./CardPacksActions";
import { cardPacksAPI } from "../dal/CardPacksAPI";
import axios from "axios";
import { setCardsError } from "../../Cards/bll/cardsActions";
import { isFetching } from "bll/passwordRecoverReducer";

export const getCardPacksTC = (): AppThunkType => {
    return (dispatch, getState: () => AppRootStoreType) => {
        const state = getState();
        const { pageCount, page, sortPacks, packName, min, max, user_id } = state.cardPacks
        dispatch(isFetching(true))
        cardPacksAPI.getCardPacks(pageCount, page, sortPacks, packName, min, max, user_id)
            .then(res => {
                dispatch(isFetching(false))
                dispatch(setCardPacks(res.data.cardPacks))
                dispatch(setTotalPacksCount(res.data.cardPacksTotalCount))
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

export const deleteCardPackTC = (id: string): AppThunkType => {
    return (dispatch) => {
        dispatch(isFetching(true))
        cardPacksAPI.deleteCardPack(id)
            .then(() => {
                dispatch(isFetching(false))
                dispatch(getCardPacksTC())
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
export const createCardPackTC = (): AppThunkType => {
    return (dispatch) => {
        dispatch(isFetching(true))
        cardPacksAPI.createCardPack()
            .then(() => {
                dispatch(isFetching(false))
                dispatch(getCardPacksTC())
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
export const updateCardPackTC = (id: string, name: string): AppThunkType => {
    return (dispatch) => {
        dispatch(isFetching(true))
        cardPacksAPI.updateCardPack(id, name)
            .then(() => {
                dispatch(isFetching(false))
                dispatch(getCardPacksTC())
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