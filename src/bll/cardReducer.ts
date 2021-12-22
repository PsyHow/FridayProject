import { AppRootStoreType, AppThunkType } from "../bll/Store";
import { cardAPI } from "../components/Table/CardPacks/CardPacksAPI";

const initialState = {
    cards: [] as CardsType[],
    id: '',
}

export const cardReducer = (state = initialState, action: ActionCardTypes): InitialStateType => {
    switch (action.type) {
        case "CARD_GET_CARDS":
            return { ...state, cards: action.cards }
        case "CARD_GET_ID":
            return { ...state, id: action.id }
        default:
            return state;
    }
}

//actions
export const getCardAC = (cards: CardsType[]) => ( {
    type: "CARD_GET_CARDS",
    cards,
} as const )

export const getCadIdAC = (id: string) => ( {
    type: "CARD_GET_ID",
    id,
} as const )

//thunk
export const getCardsTC = (token: string): AppThunkType => {
    return (dispatch, getState: () => AppRootStoreType) => {
        // const state = getState();
        // const { id } = state.cardReducer;
        cardAPI.getCards(token)
            .then((res) => {
                // debugger
                dispatch(getCardAC(res.data.cards))
                // dispatch(getCadIdAC(res.data.card))
            })
            .then(err => {
                console.log(err)
            })
    }
}

export const deleteCardTC = (): AppThunkType => {
    return (dispatch, getState: () => AppRootStoreType) => {
        cardAPI.deleteCard()
            .then(() => {
                // dispatch(getCardTC())
            })
            .then(err => {
                console.log(err)
            })
    }
}

export const createCardTC = (): AppThunkType => {
    return (dispatch) => {
        cardAPI.createCard()
            .then(() => {
                // dispatch(getCardTC())
            })
            .catch((error) => {
            })
    }
}

export const updateCardTC = (id: string, name: string): AppThunkType => {
    return (dispatch) => {
        cardAPI.updateCard()
            .then(() => {
                // dispatch(getCardTC())
            })
            .catch((error) => {
            })
    }
}

//types
type InitialStateType = typeof initialState;

export type ActionCardTypes = ReturnType<typeof getCardAC>
    | ReturnType<typeof getCadIdAC>

export type CardsType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}