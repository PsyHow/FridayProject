import { ChangeEvent, FC } from "react";
import styles from "features/authorization/Login/Login.module.css";
import { NavLink } from "react-router-dom";

export const Login: FC<PropsType> = ({
                                         email,
                                         error,
                                         onLoginButtonClick,
                                         onEmailChangeHandler,
                                         onPasswordChangeHandler,
                                         password,
                                     }) => {
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

type PropsType = {
    email: string
    onEmailChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
    password: string
    onPasswordChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
    error: string | null
    onLoginButtonClick: () => Promise<void>
}