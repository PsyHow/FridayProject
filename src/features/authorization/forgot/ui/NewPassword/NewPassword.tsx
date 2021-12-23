import SuperInputText from "../../../../../components/common/Input/Input";
import Button from "../../../../../components/common/Button/Button";
import style from "./NewPassword.module.css"
import { Navigate } from "react-router-dom";
import React from "react";

export const NewPassword = (props: PropsType) => {

    const {
        onChange, password, error,
        onSubmit, isFetching, confirmPass,
        onChangeConfirmPass, setNewPassword,
    } = props

    if(setNewPassword) {
        return <Navigate to="/login"/>
    }

    return (
        <div>
            <div className={ style.loadingBox }>
                { isFetching ? <span className={ style.loading }>Loading</span> : '' }
            </div>
            <div className={ style.container }>
                <h1>Create new Password</h1>
                <SuperInputText type={ "password" }
                                placeholder={ "Enter new password" }
                                onChangeText={ onChange }
                                value={ password }/>
                <SuperInputText type={ "password" }
                                placeholder={ "Confirm new password" }
                                onChangeText={ onChangeConfirmPass }
                                value={ confirmPass } error={ error }/>
                <Button onClick={ onSubmit } disabled={ isFetching }>Create new
                    password</Button>
            </div>
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
    setNewPassword: boolean
}