import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStoreType } from "bll/Store";
import { Navigate, NavLink } from "react-router-dom";
import styles from "features/authorization/Login/Login.module.css"
import { loginTC } from "features/authorization/dal/authReducer/authThunks";
import { setError } from "features/authorization/dal/registrationReducer/registrationActions";


export const Login = () => {
    const dispatch = useDispatch()

    let [email, setEmail] = useState("viktorburnyshev@gmail.com")
    let [password, setPassword] = useState("12345QWER")
    let [rememberMe, setRememberMe] = useState(true)

    const error = useSelector<AppRootStoreType, string | null>(state => state.registrationReducer.error)
    const isLogged = useSelector<AppRootStoreType, boolean>(state => state.authReducer.isLogged)

    if (isLogged) {
        return <Navigate to="/profile"/>;
    }

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
        dispatch(loginTC(email, password, rememberMe))
    }


    return (
        <div className={ styles.loginPage }>
            <form className={ styles.formWrapper }>
                <h1 className={ styles.pageTitle }>It-incubator</h1>
                <h2 className={ styles.signIn }>Sign In</h2>
                <span className={ styles.label }>Email</span>
                <input value={ email }
                       onChange={ onEmailChangeHandler }
                       className={ styles.input }
                />

                <span className={ styles.label }>Password</span>
                <input value={ password }
                       type="password"
                       onChange={ onPasswordChangeHandler }
                       className={ styles.input }
                />

                <NavLink to={ "/restore" } className={ styles.forgot }>Forgot
                    Password</NavLink>


                {
                    error ? <span className={ styles.error }>{ error }</span> :
                        <button onClick={ onLoginButtonClick }
                                className={ styles.button }>Login
                        </button>
                }

                <span className={ styles.dontHaveAcc }>Don’t have an account?</span>
                <NavLink to={ "/signup" } className={ styles.signUp }>Sign Up</NavLink>
            </form>
        </div>
    )
}