import Input from "../../../../../components/common/Input/Input";
import Button from "../../../../../components/common/Button/Button";
import style from "./Restore.module.css"
import { SendEmail } from "../SendEmail/SendEmail";
import { Preloader } from "components/Preloader/Preloader";


export const Restore = (props: PropsType) => {

    const {
        email,
        error,
        onChangeText,
        onClickHandler,
        isFetching,
        sendEmail,
    } = props

    return <div className={ style.box }>
        {
            isFetching ? <Preloader/> :
                !sendEmail ?
                    <div className={ style.container }>
                        <h1>Forgot your password ?</h1>
                        <Input type={ "email" }
                               placeholder={ "Enter Email" }
                               onChangeText={ onChangeText }
                               value={ email }
                               error={ error }/>
                        <h5>Enter your email address and we will send you further
                            instructions</h5>
                        <Button onClick={ onClickHandler }
                                disabled={ isFetching }>Send</Button>
                    </div>
                    : <SendEmail/>
        }
    </div>
}

//types
type PropsType = {
    email: string
    error: null | string
    onChangeText: (value: string) => void
    onClickHandler: () => void
    isFetching: boolean
    sendEmail: boolean
}