import Input from "../../../../../components/Input/Input";
import Button from "../../../../../components/Button/Button";
import style from "./Restore.module.css"


export const Restore = (props: PropsType) => {

    const { email, error, onChangeText, onClickHandler, isFetching } = props

    return (
        <div>
            { isFetching ? <span className={ style.loading }>loading</span>
                : <div className={ style.container }>
                    <Input type={ "email" }
                           placeholder={ "Enter Email" }
                           onChangeText={ onChangeText }
                           value={ email }
                           error={ error }/>
                    <Button onClick={ onClickHandler }>Send</Button>
                </div>
            }
        </div>
    )
}

//types
type PropsType = {
    email: string
    error: null | string
    onChangeText: (value: string) => void
    onClickHandler: () => void
    isFetching: boolean
}