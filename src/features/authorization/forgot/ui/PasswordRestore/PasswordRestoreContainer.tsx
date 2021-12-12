import { Restore } from "./Restore";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStoreType } from "../../../../../bll/Store";
import { recoverTC, setError } from "../../../../../bll/passwordRecoverReducer";

export const PasswordRestoreContainer = () => {

    const [email, setEmail] = useState<string>('')

    const error = useSelector<AppRootStoreType, null | string>(state => state.recovery.error)
    const isFetching = useSelector<AppRootStoreType, boolean>(state => state.recovery.isFetching)
    const sendEmail = useSelector<AppRootStoreType, boolean>(state => state.recovery.sendEmail)
    const dispatch = useDispatch()

    const onChangeEmail = (value: string) => {
        setEmail(value)
        if(error !== null) {
            dispatch(setError(error))
        }
    }

    const onClickHandler = () => {
        if(email === '') {
            dispatch(setError('Required'))
        } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            dispatch(setError('Invalid email address'))
        } else {
            dispatch(recoverTC(email))
            setEmail('')
        }
    }

    return (
        <Restore email={ email }
                 onChangeText={ onChangeEmail }
                 onClickHandler={ onClickHandler }
                 error={ error }
                 isFetching={ isFetching }
                 sendEmail={sendEmail}/>
    )
}