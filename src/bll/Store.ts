import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { passwordRecoverReducer } from "./passwordRecoverReducer";
import {signUpReducer} from "./signUpReducer";

const reducers = combineReducers({
    recovery: passwordRecoverReducer,
    registration: signUpReducer
})

export const store = createStore(reducers, applyMiddleware(thunk))

export type AppRootStoreType = ReturnType<typeof reducers>