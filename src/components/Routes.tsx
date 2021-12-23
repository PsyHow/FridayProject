import { Route, Routes } from "react-router-dom";
import { Login } from "./Login/Login";
import { Profile } from "./Profile/Profile";
import { SignUpContainer } from "../features/authorization/signUp/SignUpContainer";
import { Test } from "./Test/Test";
import { Error } from "./Error"
import { PasswordRestoreContainer } from "../features/authorization/forgot/ui/PasswordRestore/PasswordRestoreContainer";
import { NewPasswordContainer } from "../features/authorization/forgot/ui/NewPassword/NewPasswordContainer";
import { Table } from "../features/Packs/Table";
import { CardsTable } from "../features/Cards/CardsTable";

export const PATH = {
    LOGIN: "login",
    PROFILE: "profile",
    SIGN_UP: "signup",
    PASSWORD_RESTORE: 'restore',
    NEW_PASSWORD: 'set-new-password/:token',
    TEST: 'test',
    CARD_PACKS: 'packs',
    CARD: '/card/:token',
}

export const Routing = () => {
    return (
        <Routes>
            <Route path={ "/" } element={ <Login/> }/>
            <Route path={ PATH.PROFILE } element={ <Profile/> }/>
            <Route path={ PATH.SIGN_UP } element={ <SignUpContainer/> }/>
            <Route path={ PATH.PASSWORD_RESTORE }
                   element={ <PasswordRestoreContainer/> }/>
            <Route path={ PATH.NEW_PASSWORD } element={ <NewPasswordContainer/> }/>
            <Route path={ PATH.TEST } element={ <Test/> }/>
            <Route path={ PATH.LOGIN } element={ <Login/> }/>
            <Route path={ PATH.CARD_PACKS } element={ <Table/> }/>
            <Route path={ PATH.CARD } element={ <CardsTable/> }/>
            <Route path="*" element={ <Error/> }/>
        </Routes>
    )
}

//