import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginTC } from "bll/loginReducer";
import { AppRootStoreType } from "bll/Store";
import { Navigate, NavLink } from "react-router-dom";
import styles from "./Login.module.css"
import { instance } from "dal/apiConfing/apiConfing";


export const authAPI = {
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    me(){
        return instance.post(`auth/me`)
    },
    logout() {
        return instance.delete(`auth/me`)
    }
}

export const Login = () => {
    const dispatch = useDispatch()

    let [email, setEmail] = useState("nya-admin@nya.nya1") //nya-admin@nya.nya
    let [password, setPassword] = useState("1qazxcvBG") // 1qazxcvBG
    let [rememberMe, setRememberMe] = useState(true)
    let [errorShow, setErrorShow] = useState(false)

    const isLogged = useSelector<AppRootStoreType, boolean>(state => state.loginReducer.isLogged)
    const error = useSelector<AppRootStoreType, string>(state => state.loginReducer.error)

    if (isLogged) {
        return <Navigate to="/profile"/>;
    }

    const onEmailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setErrorShow(false)
        let text = e.currentTarget.value
        setEmail(text)
    }
    const onPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setErrorShow(false)
        setPassword(e.currentTarget.value)
    }
    const onLoginButtonClick = async () => {
        dispatch(loginTC(email, password, rememberMe))
        setErrorShow(true)
    }


    return (
        <div className={styles.loginPage}>
            <form className={styles.formWrapper}>
                <h1 className={styles.pageTitle}>It-incubator</h1>
                <h2 className={styles.signIn}>Sign In</h2>
                <span className={styles.label}>Email</span>
                <input value={email}
                       onChange={onEmailChangeHandler}
                       className={styles.input}
                />
                {/*email*/}

                <span className={styles.label}>Password</span>
                <input value={password}
                       onChange={onPasswordChangeHandler}
                       className={styles.input}
                />
                {/*password*/}


                <NavLink to={"/restore"} className={styles.forgot}>Forgot Password</NavLink>

                {errorShow ? <>
                        {error && <span className={styles.error}>{error}</span>}
                    </> :
                    <button onClick={onLoginButtonClick}
                            className={styles.button}>Login
                    </button>}

                {/*Button Loggin or show error */}


                <span className={styles.dontHaveAcc}>Don’t have an account?</span>
                <NavLink to={"/signup"} className={styles.signUp}>Sign Up</NavLink>
            </form>
        </div>
    )
}