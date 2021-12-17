import { Dispatch } from "redux"
import { registrationAPI } from "../features/authorization/forgot/dal/ForgotApi"

const initialState = {
    isFetching: false,
    error: null as null | string,
    setNewPassword: false,
    sendEmail: false,
}

export const passwordRecoverReducer =
    (state = initialState, action: passwordRecoverActionTypes): InitialStateType => {
        switch (action.type) {
            case "RECOVER/IS_FETCHING":
            case "RECOVERY/ERROR":
                return { ...state, ...action.payload }
            case "RECOVERY/SET_NEW_PASSWORD":
                return { ...state, setNewPassword: true }
            case "RECOVERY/SEND_EMAIL":
                return { ...state, sendEmail: true }
            default:
                return state
        }
    }

//actions
export const isFetching = (isFetching: boolean) => ( {
    type: "RECOVER/IS_FETCHING",
    payload: { isFetching },
} as const );
export const setError = (error: null | string) => ( { type: "RECOVERY/ERROR", payload: { error } } as const );
export const setNewPassword = () => ( { type: "RECOVERY/SET_NEW_PASSWORD" } as const );
export const sendEmail = () => ( { type: "RECOVERY/SEND_EMAIL" } as const );

//thunk
export const recoverTC = (email: string) => (dispatch: Dispatch) => {
    dispatch(isFetching(true))
    registrationAPI.forgot(email)
        .then(res => {
            console.log(res.data)
            dispatch(sendEmail())
        })
        .catch((e) => {
            const error = e.response ? e.response.data.error : ( e.message + ", more details in the console" )
            dispatch(setError(error))
        })
        .finally(() => {
            dispatch(isFetching(false))
        })
}

export const newPassword = (password: string, token: string) => (dispatch: Dispatch) => {
    dispatch(isFetching(true))
    registrationAPI.newPassword({ password, resetPasswordToken: token })
        .then(res => {
            dispatch(setNewPassword())
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

//types
type InitialStateType = typeof initialState

export type SetErrorType = ReturnType<typeof setError>
type passwordRecoverActionTypes = ReturnType<typeof isFetching>
    | ReturnType<typeof setNewPassword>
    | ReturnType<typeof sendEmail>
    | SetErrorType