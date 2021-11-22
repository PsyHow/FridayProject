import { combineReducers, createStore } from "redux";
import { firstReducer }                 from "./FirstReducer";

const reducers = combineReducers({
    firstReducer,
})

export const store = createStore(reducers)

export type AppRootStoreType = ReturnType<typeof reducers>