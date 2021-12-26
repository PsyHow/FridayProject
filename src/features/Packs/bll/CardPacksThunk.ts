import { AppRootStoreType, AppThunkType } from "../../../bll/Store";
import { setCardPacks, setTotalItemsCount } from "./CardPacksActions";
import { cardPacksAPI } from "../dal/CardPacksAPI";
import axios from "axios";
import { setCardsError } from "../../Cards/bll/cardsActions";

export const getCardPacksTC = (): AppThunkType => {
    return (dispatch, getState: () => AppRootStoreType) => {
        const state = getState();
        const { pageCount, page, sortPacks, packName, min, max } = state.cardPacks
        cardPacksAPI.getCardPacks(pageCount, page, sortPacks, packName, min, max)
            .then(res => {
                dispatch(setCardPacks(res.data.cardPacks))
                dispatch(setTotalItemsCount(res.data.cardPacksTotalCount))
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

export const deleteCardPackTC = (id: string): AppThunkType => {
    return (dispatch) => {
        cardPacksAPI.deleteCardPack(id)
            .then(() => {
                dispatch(getCardPacksTC())
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
export const createCardPackTC = (): AppThunkType => {
    return (dispatch) => {
        cardPacksAPI.createCardPack()
            .then(() => {
                dispatch(getCardPacksTC())
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
export const updateCardPackTC = (id: string, name: string): AppThunkType => {
    return (dispatch) => {
        cardPacksAPI.updateCardPack(id, name)
            .then(() => {
                dispatch(getCardPacksTC())
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