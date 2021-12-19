import { applyMiddleware, combineReducers, createStore } from "redux";
import { firstReducer } from "./FirstReducer";
import thunk from "redux-thunk";
import { loginReducer } from "./loginReducer";
import { profileReducer } from "./profileReducer";
import { passwordRecoverReducer } from "./passwordRecoverReducer";
import { signUpReducer } from "./signUpReducer";
import { pageReducer } from "./paginator_reducer/paginator_reducer";

const reducers = combineReducers({
    firstReducer,
    loginReducer,
    profileReducer,
    pageReducer,
    recovery: passwordRecoverReducer,
    registration: signUpReducer,
})

export const store = createStore(reducers, applyMiddleware(thunk))

export type AppRootStoreType = ReturnType<typeof reducers>