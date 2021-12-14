import { applyMiddleware, combineReducers, createStore } from "redux";
import { firstReducer } from "./FirstReducer";
import thunk from "redux-thunk";
import {loginReducer} from "./loginReducer";
import {profileReducer} from "./profileReducer";

const reducers = combineReducers({
    firstReducer,
    loginReducer,
    profileReducer
})

export const store = createStore(reducers, applyMiddleware(thunk))

export type AppRootStoreType = ReturnType<typeof reducers>