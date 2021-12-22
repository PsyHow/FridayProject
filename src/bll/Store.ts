import { applyMiddleware, combineReducers, createStore } from "redux";
import { firstReducer } from "./FirstReducer";
import thunk, {ThunkAction} from "redux-thunk";
import { loginReducer } from "./loginReducer";
import { profileReducer } from "./profileReducer";
import { passwordRecoverReducer } from "./passwordRecoverReducer";
import { signUpReducer } from "./signUpReducer";
import {CardPacksActionsType, cardPacksReducer} from "../components/Table/CardPacks/CardPacksReducer";
import { ActionCardTypes, cardReducer } from "./cardReducer";

const reducers = combineReducers({
    firstReducer,
    loginReducer,
    profileReducer,
    cardReducer,
    recovery: passwordRecoverReducer,
    registration: signUpReducer,
    cards: cardPacksReducer
})

export const store = createStore(reducers, applyMiddleware(thunk))

export type AppRootStoreType = ReturnType<typeof reducers>

//все типы экшенов для всего app
export type AppActionsType=CardPacksActionsType | ActionCardTypes;

export type AppThunkType<ReturnType=void>=ThunkAction<
    ReturnType,
    AppRootStoreType,
    unknown,
    AppActionsType
    >
