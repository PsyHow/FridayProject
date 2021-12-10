import { Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { Profile } from "./Profile/Profile";
import { SignUp } from "./SIgnUp/SignUp";
import { Restore } from "./PasswordRestore/Restore";
import { NewPassword } from "./NewPassword/NewPassword";
import { Test } from "./Test/Test";
import { Error } from "./Error"

export const PATH = {
    LOGIN: "login",
    PROFILE: "profile",
    SIGN_UP: "signup",
    PASSWORD_RESTORE: 'restore',
    NEW_PASSWORD: 'newPassword',
    TEST: 'test',
}

export const Routing = () => {
    return (
        <Routes>
            <Route path={ "/" } element={ <Login/> }/>
            <Route path={ PATH.PROFILE } element={ <Profile/> }/>
            <Route path={ PATH.SIGN_UP } element={ <SignUp/> }/>
            <Route path={ PATH.PASSWORD_RESTORE } element={ <Restore/> }/>
            <Route path={ PATH.NEW_PASSWORD } element={ <NewPassword/> }/>
            <Route path={ PATH.TEST } element={ <Test/> }/>
            <Route path={ PATH.LOGIN } element={ <Login/> }/>
            <Route path="*" element={ <Error/> }/>
        </Routes>
    )
}

//