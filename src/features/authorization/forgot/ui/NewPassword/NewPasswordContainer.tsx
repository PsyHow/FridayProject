import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { newPassword } from "../../../../../bll/passwordRecoverReducer";
import { AppRootStoreType } from "../../../../../bll/Store";
import { NewPassword } from "./NewPassword";


export const NewPasswordContainer = () => {

    const { token } = useParams<"token">()
    const [pass, setPass] = useState<string>('')
    const dispatch = useDispatch();
    const error = useSelector<AppRootStoreType, string | null>(state => state.recovery.error)
    const isFetching = useSelector<AppRootStoreType, boolean>(state => state.recovery.isFetching)

    const onSubmit = () => {
        dispatch(newPassword(pass, token || ''))
    }

    const onChange = (value: string) => {
        setPass(value)
    }

    return <NewPassword onChange={onChange}
                        password={pass}
                        error={error}
                        onSubmit={onSubmit}
                        isFetching={isFetching}/>
}