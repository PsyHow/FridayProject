import { Dispatch } from "redux";
import { setUser } from "bll/profileReducer";
import { authAPI } from "features/authorization/api/authApit";
import {
    loggingInAC,
} from "features/authorization/dal/authReducer/authActions";
import { setError } from "features/authorization/dal/registrationReducer/registrationActions";

export const loginTC = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch: Dispatch) => {
        authAPI.login(email, password, rememberMe)
            .then((response) => {
                if (response.data._id) {
                    dispatch(loggingInAC(true))
                    dispatch(setUser(response.data))
                }
            })
            .catch((error) => {
                dispatch(setError(error.response.data.error))
            })
    }
}

export const authMe = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            dispatch(loggingInAC(true))
            dispatch(setUser(res.data))
        })
        .catch(() => {
            dispatch(loggingInAC(false))
        })
}

export const logout = () => (dispatch: Dispatch) => {
    authAPI.logout()
        .then(() => {
            dispatch(loggingInAC(false))
        })
}