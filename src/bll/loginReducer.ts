import {Dispatch} from "redux";
import {authAPI} from "../components/Login/Login";
import {setUser} from "./profileReducer";

let initialState: authReducerStateType = {
    isLogged: false,
    error: "",
}

export const loginReducer = (state = initialState, action: UnionActionType_LOGIN_REDUCER): authReducerStateType => {
    switch (action.type) {
        case "LOGGING_IN":{
            return {...state,isLogged : action.isLogged}
        }
        case "LOGIN_FAILED":{
            return {...state,error : action.error}
        }
    }
    return state
}

//THUNKS
export const loginTC = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch: Dispatch) => {
        authAPI.login(email, password, rememberMe)
            .then((response) => {
                if(response.data._id){
                    dispatch(loggingInAC(true))
                    dispatch(setUser(response.data))
                }
            })
            .catch((error) => {
                dispatch(loginFailAC(error.response.data.error))
            })
    }
}

export const authMe = () => (dispatch:Dispatch) => {
    authAPI.me()
        .then(res=> {
            dispatch(loggingInAC(true))
            dispatch(setUser(res.data))
        })
        .catch(()=> {
            dispatch(loggingInAC(false))
        })
}

export const logout = () => (dispatch:Dispatch) => {
    authAPI.logout()
        .then((res)=> {
            dispatch(loggingInAC(false))
        })
}

// ACTION CREATORS
const loginFailAC = (error: string) => ({
    type: "LOGIN_FAILED",
    error
}as const)

const loggingInAC = (isLogged: boolean) => ({
    type: "LOGGING_IN",
    isLogged
}as const)

//TYPES

type authReducerStateType = {
    isLogged: boolean
    error: string
}

type UnionActionType_LOGIN_REDUCER = LoginFailActionType | LoggingInActionType

type LoginFailActionType = ReturnType<typeof loginFailAC>
type LoggingInActionType = ReturnType<typeof loggingInAC>







