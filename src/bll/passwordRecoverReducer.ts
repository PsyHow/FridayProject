import { Dispatch } from "redux"
import { registrationAPI } from "../features/authorization/forgot/dal/ForgotApi"

const initialState = {
    isFetching: false,
    error: null as null | string,
}

export const passwordRecoverReducer =
    (state = initialState, action: passwordRecoverActionTypes): InitialStateType => {
        switch (action.type) {
            case "RECOVER/ISFETCHING":
            case "RECOVERY/ERROR":
                return { ...state, ...action.payload }
            default:
                return state
        }
    }

//actions
export const isFetching = (isFetching: boolean) => ( { type: "RECOVER/ISFETCHING", payload: { isFetching } } as const );
export const setError = (error: null | string) => ( { type: "RECOVERY/ERROR", payload: { error } } as const );

//thunk
export const recoverTC = (email: string) => (dispatch: Dispatch<passwordRecoverActionTypes>) => {
    dispatch(isFetching(true))
    registrationAPI.forgot(email)
        .then(res => {
            console.log(res.data)
        })
        .catch((e) => {
            const error = e.response ? e.response.data.error : ( e.message + ", more details in the console" )
            dispatch(setError(error))
        })
        .finally(() => {
            dispatch(isFetching(false))
        })
}

//types
type InitialStateType = typeof initialState

type passwordRecoverActionTypes = ReturnType<typeof isFetching>
    | ReturnType<typeof setError>