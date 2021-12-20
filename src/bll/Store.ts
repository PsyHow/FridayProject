import { applyMiddleware, combineReducers, createStore } from "redux";
import { firstReducer } from "./FirstReducer";
import thunk, {ThunkAction} from "redux-thunk";
import { loginReducer } from "./loginReducer";
import { profileReducer } from "./profileReducer";
import { passwordRecoverReducer } from "./passwordRecoverReducer";
import { signUpReducer } from "./signUpReducer";
<<<<<<<<< Temporary merge branch 1
import { pageReducer } from "./paginator_reducer/paginator_reducer";
=========
import {CardPacksActionsType, cardPacksReducer} from "../components/Table/CardPacks/CardPacksReducer";
>>>>>>>>> Temporary merge branch 2

const reducers = combineReducers({
    firstReducer,
    loginReducer,
    profileReducer,
    pageReducer,
    recovery: passwordRecoverReducer,
    registration: signUpReducer,
    cards: cardPacksReducer
})

export const store = createStore(reducers, applyMiddleware(thunk))

export type AppRootStoreType = ReturnType<typeof reducers>

//все типы экшенов для всего app
export type AppActionsType=CardPacksActionsType;

export type AppThunkType<ReturnType=void>=ThunkAction<
    ReturnType,
    AppRootStoreType,
    unknown,
    AppActionsType
    >
