import Input from "../../../../../components/Input/Input";
import Button from "../../../../../components/Button/Button";
import style from "./NewPassword.module.css"

export const NewPassword = (props: PropsType) => {

    const { onChange, password, error, onSubmit, isFetching } = props

    return (
        <div>
            { isFetching ? <span className={style.loading}>Loading</span>
                : <div className={ style.container }>
                    <Input type={ "password" }
                           onChangeText={ onChange }
                           value={ password } error={ error }/>
                    <Button onClick={ onSubmit }>ok</Button>
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
}