import { Dispatch } from "redux"
import { registrationAPI } from "../features/authorization/forgot/dal/ForgotApi"

const initialState = {
    isFetching: false,
    emailError: null as null | string,
    passwordError: null as null | string,
    isRegistrationSuccessful:false
}
type InitialStateType = typeof initialState

export const signUpReducer =
    (state = initialState, action: RegistrationActionTypes): InitialStateType => {
        switch (action.type) {
            case "REGISTRATION/ISFETCHING":
                return { ...state, isFetching: action.isFetching}
            case "REGISTRATION/EMAILERROR":
                return { ...state, emailError: action.error}
            case "REGISTRATION/PASSWORDERROR":
                return { ...state, passwordError: action.error}
            case "REGISTRATION/ISREGISTRATIONSUCCESSFUL":
                return { ...state, isRegistrationSuccessful: action.isRegistrationSuccessful}
            default:
                return state
        }
    }

export const toggleIsFetching = (isFetching: boolean) => ( { type: "REGISTRATION/ISFETCHING",  isFetching  } as const );
export const toggleIsRegistrationSuccessful = (isRegistrationSuccessful: boolean) => ( { type: "REGISTRATION/ISREGISTRATIONSUCCESSFUL", isRegistrationSuccessful } as const );
export const setEmailError = (error: null | string) => ( { type: "REGISTRATION/EMAILERROR", error  } as const );
export const setPasswordError = (error: null | string) => ( { type: "REGISTRATION/PASSWORDERROR",error  } as const );


export const signUpTC = (email: string, password: string) => (dispatch: Dispatch<RegistrationActionTypes>) => {
   dispatch(toggleIsFetching(true))
    registrationAPI.signUp(email, password)
        .then(() => {
            dispatch(toggleIsRegistrationSuccessful(true))
        })
        .catch((res) => {
            console.log(res.response.data.error)
        })
        .finally(() => {
            dispatch(toggleIsFetching(false))
        })
}

type RegistrationActionTypes = ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof setEmailError>
    | ReturnType<typeof setPasswordError>
    | ReturnType<typeof toggleIsRegistrationSuccessful>
