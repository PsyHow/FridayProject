import style from "../forgot/ui/PasswordRestore/Restore.module.css";
import SuperInputText from "../../../components/common/Input/Input";
import Button from "../../../components/common/Button/Button";
import { Preloader } from "components/Preloader/Preloader";

export const SignUp = (props: PropsType) => {

    const {
        email, onChangeEmail, error,
        password, onChangePassword,
        onClickHandler, isFetching,
    } = props

    return <div>
        { isFetching ? <Preloader/>
            : <div className={ style.container }>
                <h1>Sign Up</h1>
                <SuperInputText type={ "email" }
                                placeholder={ "Enter Email" }
                                onChangeText={ onChangeEmail }
                                value={ email }/>
                <SuperInputText type={ "password" }
                                placeholder={ "Enter Password" }
                                onChangeText={ onChangePassword }
                                value={ password }
                                error={ error }/>
                <Button onClick={ onClickHandler }
                        disabled={ isFetching }>Register</Button>
            </div>
        }
    </div>
}

type PropsType = {
    email: string
    onChangeEmail: (value: string) => void
    password: string
    onChangePassword: (value: string) => void
    isFetching: boolean
    onClickHandler: () => void
    error: null | string
}