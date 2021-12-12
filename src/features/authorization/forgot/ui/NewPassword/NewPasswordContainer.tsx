import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { newPassword, setError } from "../../../../../bll/passwordRecoverReducer";
import { AppRootStoreType } from "../../../../../bll/Store";
import { NewPassword } from "./NewPassword";


export const NewPasswordContainer = () => {

    const { token } = useParams<"token">()
    const [pass, setPass] = useState<string>('')
    const [confirmPass, setConfirmPass] = useState<string>('')
    const dispatch = useDispatch();
    const error = useSelector<AppRootStoreType, string | null>(state => state.recovery.error)
    const isFetching = useSelector<AppRootStoreType, boolean>(state => state.recovery.isFetching)

    const onSubmit = () => {
        if(pass !== confirmPass) {
            dispatch(setError('passwords must be match'))
        } else {
            dispatch(newPassword(pass, token || ''))
        }
    }

    const onChangePass = (value: string) => {
        setPass(value)
    }
    const onChangeConfirmPass = (value: string) => {
        setConfirmPass(value)
    }

    return <NewPassword onChange={ onChangePass }
                        password={ pass }
                        confirmPass={ confirmPass }
                        error={ error }
                        onSubmit={ onSubmit }
                        isFetching={ isFetching }
                        onChangeConfirmPass={ onChangeConfirmPass }/>
}