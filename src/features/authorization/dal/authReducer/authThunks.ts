import { Dispatch } from "redux";
import { setUser } from "bll/profileReducer";
import { authAPI } from "features/authorization/api/authApit";
import {
    loggingInAC,
} from "features/authorization/dal/authReducer/authActions";
import { setError } from "features/authorization/dal/registrationReducer/registrationActions";
import { LoginData } from "features/authorization/api/authTypes";
import axios from "axios";

export const loginTC = (data:LoginData) => {
    return (dispatch: Dispatch) => {
        authAPI.login(data)
            .then((response) => {
                if (response.data._id) {
                    dispatch(loggingInAC(true))
                    dispatch(setUser(response.data))
                }
            })
            .catch((error) => {
                if (axios.isAxiosError(error) && error.response) {
                    dispatch(setError(error.response.data.error));
                } else if (axios.isAxiosError(error)) {
                    dispatch(setError(error.message));
                }
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