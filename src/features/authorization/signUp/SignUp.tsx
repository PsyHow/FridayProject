import style from "../forgot/ui/PasswordRestore/Restore.module.css";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

export const SignUp = (props: PropsType) => {

    const { email, onChangeEmail, emailError,
        password,onChangePassword,passwordError,
        onClickHandler, isFetching } = props

    return (
        <div>
            { isFetching ? <span className={ style.loading }>loading</span>
                : <div className={ style.container }>
                    <h1>Sign Up</h1>
                    <Input type={ "email" }
                           placeholder={ "Enter Email" }
                           onChangeText={ onChangeEmail }
                           value={ email }
                           error={ emailError }/>
                    <Input type={ "password" }
                           placeholder={ "Enter Password" }
                           onChangeText={ onChangePassword }
                           value={ password }
                           error={ passwordError }/>
                    <Button onClick={ onClickHandler } disabled={ isFetching }>Register</Button>
                </div>
            }
        </div>
    )
}

type PropsType = {
    email: string
    onChangeEmail: (value: string) => void
    emailError: null | string
    password: string
    onChangePassword: (value: string) => void
    passwordError: null | string
    isFetching: boolean
    onClickHandler: () => void
}