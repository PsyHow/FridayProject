import { AuthReducerTypes, InitialStateType } from "features/authorization/dal/authReducer/authTypes";

export const initialState = {
    isLogged: false,
    error: "",
}

export const authReducer = (state = initialState, action: AuthReducerTypes): InitialStateType => {
    switch (action.type) {
        case "LOGGING_IN": {
            return { ...state, isLogged: action.isLogged }
        }
        case "LOGIN_FAILED": {
            return { ...state, error: action.error }
        }
    }
    return state
}










