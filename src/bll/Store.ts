import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import { profileReducer } from "./profileReducer";
import {
    registrationReducer,
} from "features/authorization/dal/registrationReducer/registrationReducer";
import { cardPacksReducer } from "features/Packs/bll/CardPacksReducer";
import { CardPacksActionsType } from "features/Packs/bll/CardPacksTypes";
import { cardsReducer } from "features/Cards/bll/cardsReducer";
import { ActionCardTypes } from "features/Cards/bll/cardsTypes";
import { authReducer } from "features/authorization/dal/authReducer/authReducer";
import { RegistrationTypes } from "features/authorization/dal/registrationReducer/registrationTypes";
import { AuthReducerTypes } from "features/authorization/dal/authReducer/authTypes";

const reducers = combineReducers({
    profileReducer,
    cardsReducer,
    registrationReducer,
    cardPacksReducer,
    authReducer,
})

export const store = createStore(reducers, applyMiddleware(thunk))

export type AppRootStoreType = ReturnType<typeof reducers>

//все типы экшенов для всего app
export type AppActionsType =
    CardPacksActionsType
    | ActionCardTypes
    | RegistrationTypes
    | AuthReducerTypes;

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType,
    AppRootStoreType,
    unknown,
    AppActionsType>
