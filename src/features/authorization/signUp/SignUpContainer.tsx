import { SignUp } from "./SignUp";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStoreType } from "../../../bll/Store";
import { signUpTC } from "../../../bll/signUpReducer";
import { Navigate } from "react-router-dom";
import { setError } from "../../../bll/passwordRecoverReducer";


export const SignUpContainer = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const error = useSelector<AppRootStoreType, null | string>(state => state.registration.error)
    // const emailError = useSelector<AppRootStoreType, null | string>(state => state.registration.emailError)
    // const passwordError = useSelector<AppRootStoreType, null | string>(state => state.registration.passwordError)
    const isFetching = useSelector<AppRootStoreType, boolean>(state => state.registration.isFetching)
    const isRegistrationSuccessful = useSelector<AppRootStoreType, boolean>(state => state.registration.isRegistrationSuccessful)
    const dispatch = useDispatch()

    const onChangeEmail = (value: string) => {
        setEmail(value)
        dispatch(setError(null))
    }
    const onChangePassword = (value: string) => {
        setPassword(value)
        dispatch(setError(null))
    }

    const onClickHandler = () => {

        if(email === '') {
            dispatch(setError('Required'))
        } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            dispatch(setError('Invalid email address'))
            return
        }

        if(password.length < 7) {
            dispatch(setError('Password should be more than 7 characters'))
        }

        if(!error) {
            dispatch(signUpTC(email, password))
        }
    }

    if(isRegistrationSuccessful) {
        return <Navigate to={ "/" }/>
    }

    return (
        <SignUp email={ email }
                onChangeEmail={ onChangeEmail }
            // emailError={emailError}
                password={ password }
                onChangePassword={ onChangePassword }
            // passwordError={passwordError}
                isFetching={ isFetching }
                onClickHandler={ onClickHandler }
                error={ error }/>
    )
}