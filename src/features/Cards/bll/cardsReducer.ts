import { ActionCardTypes, CardsType, InitialStateType } from "./cardsTypes";

export const initialState = {
    cards: [] as CardsType[],
    id: "",
}

export const cardsReducer = (state = initialState, action: ActionCardTypes): InitialStateType => {
    switch (action.type) {
        case "CARD_GET_CARDS":
            return { ...state, cards: action.cards }
        case "CARD_GET_ID":
            return { ...state, id: action.id }
        default:
            return state;
    }
}



