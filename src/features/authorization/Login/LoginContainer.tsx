import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStoreType } from "bll/Store";
import { Navigate } from "react-router-dom";
import { loginTC } from "features/authorization/dal/authReducer/authThunks";
import { setError } from "features/authorization/dal/registrationReducer/registrationActions";
import { Login } from "features/authorization/Login/Login";


export const LoginContainer = () => {
    const dispatch = useDispatch()
    const error = useSelector<AppRootStoreType, string | null>(state => state.registrationReducer.error)
    const isLogged = useSelector<AppRootStoreType, boolean>(state => state.authReducer.isLogged)

    let [email, setEmail] = useState("viktorburnyshev@gmail.com")
    let [password, setPassword] = useState("12345QWER")
    let [rememberMe, setRememberMe] = useState(true)

    const onEmailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setError(null))
        let text = e.currentTarget.value
        setEmail(text)
    }

    const onPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setError(null))
        setPassword(e.currentTarget.value)
    }

    const onLoginButtonClick = async () => {
        dispatch(loginTC({ email, rememberMe, password }))
    }

    if (isLogged) {
        return <Navigate to="/profile"/>;
    }

    return <Login email={ email }
                  error={ error }
                  onLoginButtonClick={ onLoginButtonClick }
                  onEmailChangeHandler={ onEmailChangeHandler }
                  onPasswordChangeHandler={ onPasswordChangeHandler }
                  password={ password }/>
}