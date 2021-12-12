import Input from "../../../../../components/Input/Input";
import Button from "../../../../../components/Button/Button";
import style from "./NewPassword.module.css"

export const NewPassword = (props: PropsType) => {

    const { onChange, password, error, onSubmit, isFetching, confirmPass, onChangeConfirmPass } = props

    return (
        <div>
            { isFetching ? <span className={ style.loading }>Loading</span>
                : <div className={ style.container }>
                    <h1>Create new Password</h1>
                    <Input type={ "password" }
                           placeholder={"Enter new password"}
                           onChangeText={ onChange }
                           value={ password }/>
                    <Input type={ "password" }
                           placeholder={"Confirm new password"}
                           onChangeText={ onChangeConfirmPass }
                           value={ confirmPass } error={ error }/>
                    <Button onClick={ onSubmit }>Create new password</Button>
                </div>
            }
        </div>
    )
}

//types
type PropsType = {
    onChange: (value: string) => void
    password: string
    error: string | null
    onSubmit: () => void
    isFetching: boolean
    confirmPass: string
    onChangeConfirmPass: (value: string) => void
}