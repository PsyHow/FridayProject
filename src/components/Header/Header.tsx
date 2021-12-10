import { NavLink } from "react-router-dom";
import { PATH } from "../Routes";
import style from "./Header.module.css";

export const Header = () => {
    return (
        <div className={ style.header }>
            <NavLink className={ style.link } to={ PATH.PROFILE }>Profile</NavLink>
            <NavLink className={ style.link } to={ PATH.LOGIN }>Login</NavLink>
            <NavLink className={ style.link } to={ PATH.SIGN_UP }>Sign Up</NavLink>
            <NavLink className={ style.link } to={ PATH.TEST }>Test</NavLink>
        </div>
    )
}