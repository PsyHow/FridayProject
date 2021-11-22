import { Route, Routes } from "react-router-dom";
import { Login }         from "./Login";
import { Profile }       from "./Profile/Profile";
import { SingUp }        from "./SIngUp/SingUp";
import { Restore }       from "./PasswordRestore/Restore";
import { NewPassword }   from "./NewPassword/NewPassword";
import { Test }          from "./Test/Test";
import { Error }         from "./Error"

export const PATH = {
    LOGIN: "/login",
    PROFILE: "/profile",
    SING_UP: "/singup",
    PASSWORD_RESTORE: '/restore',
    NEW_PASSWORD: '/newPassword',
    TEST: '/test',
}

export const Routing = () => {
    return (
        <div>
            <Routes>
                <Route path={ PATH.LOGIN } element={ <Login/> }/>
                <Route path={ PATH.PROFILE } element={ <Profile/> }/>
                <Route path={ PATH.SING_UP } element={ <SingUp/> }/>
                <Route path={ PATH.PASSWORD_RESTORE } element={ <Restore/> }/>
                <Route path={ PATH.NEW_PASSWORD } element={ <NewPassword/> }/>
                <Route path={ PATH.TEST } element={ <Test/> }/>
                <Route path="*" element={ <Error/> }/>
            </Routes>
        </div>
    )
}