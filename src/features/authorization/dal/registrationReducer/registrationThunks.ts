import { Dispatch } from "redux";
import {
    confirmRegistrationDataAC,
    isFetching,
    sendEmail, setError, setNewPassword,
} from "features/authorization/dal/registrationReducer/registrationActions";
import { authAPI } from "features/authorization/api/authApit";
import { loggingInAC } from "features/authorization/dal/authReducer/authActions";
import { AppActionsType } from "bll/Store";

export const recoverTC = (email: string) => (dispatch: Dispatch) => {
    dispatch(isFetching(true))
    authAPI.forgot(email)
        .then(res => {
            console.log(res.data)
            dispatch(sendEmail(true))
        })
        .catch((e) => {
            const error = e.response ? e.response.data.error : ( e.message + ", more details in the console" )
            dispatch(setError(error))
        })
        .finally(() => {
            dispatch(isFetching(false))
        })
}

export const newPassword = (password: string, token: string) => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(isFetching(true))
    authAPI.newPassword({ password, resetPasswordToken: token })
        .then(() => {
            dispatch(setNewPassword(true))
            dispatch(setError(''))
        })
        .catch((e) => {
            const error = e.response ? e.response.data.error : "Some Error"
            dispatch(setError(error))
            console.log(error)
        })
        .finally(() => {
            dispatch(isFetching(false))
        })
}

export const signUpTC = (email: string, password: string) => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(isFetching(true))
    authAPI.signUp(email, password)
        .then(() => {
            dispatch(confirmRegistrationDataAC(true))
        })
        .catch((err) => {
            dispatch(setError(err.response.data.error))
        })
        .finally(() => {
            dispatch(isFetching(false))
        })
}