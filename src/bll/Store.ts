import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { passwordRecoverReducer } from "./passwordRecoverReducer";

const reducers = combineReducers({
    recovery: passwordRecoverReducer,
})

export const store = createStore(reducers, applyMiddleware(thunk))

export type AppRootStoreType = ReturnType<typeof reducers>