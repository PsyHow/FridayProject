import { initialState } from "features/authorization/dal/authReducer/authReducer";
import { loggingInAC, loginFailAC } from "./authActions";

export type AuthReducerStateType = {
    isLogged: boolean
    error: string
}

export type AuthReducerTypes = ReturnType<typeof loginFailAC>
    | ReturnType<typeof loggingInAC>

export type InitialStateType = typeof initialState