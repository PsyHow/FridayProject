import { applyMiddleware, combineReducers, createStore } from "redux";
import { firstReducer } from "./FirstReducer";
import thunk from "redux-thunk";

const reducers = combineReducers({
    firstReducer,
})

export const store = createStore(reducers, applyMiddleware(thunk))

export type AppRootStoreType = ReturnType<typeof reducers>