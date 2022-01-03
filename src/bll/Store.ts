import { applyMiddleware, combineReducers, createStore } from "redux";
import { firstReducer } from "./FirstReducer";
import thunk, { ThunkAction } from "redux-thunk";
import { loginReducer } from "./loginReducer";
import { profileReducer } from "./profileReducer";
import {
    passwordRecoverActionTypes,
    passwordRecoverReducer,
} from "./passwordRecoverReducer";
import { signUpReducer } from "./signUpReducer";
import { cardPacksReducer } from "features/Packs/bll/CardPacksReducer";
import { CardPacksActionsType } from "features/Packs/bll/CardPacksTypes";
import { cardsReducer } from "features/Cards/bll/cardsReducer";
import { ActionCardTypes } from "features/Cards/bll/cardsTypes";

const reducers = combineReducers({
    firstReducer,
    loginReducer,
    profileReducer,
    cards: cardsReducer,
    recovery: passwordRecoverReducer,
    registration: signUpReducer,
    cardPacks: cardPacksReducer,
})

export const store = createStore(reducers, applyMiddleware(thunk))

export type AppRootStoreType = ReturnType<typeof reducers>

//все типы экшенов для всего app
export type AppActionsType=CardPacksActionsType | ActionCardTypes | passwordRecoverActionTypes;

export type AppThunkType<ReturnType=void>=ThunkAction<
    ReturnType,
    AppRootStoreType,
    unknown,
    AppActionsType
    >
