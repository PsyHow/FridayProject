import style from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { useState } from "react";
import { sidebarData } from "./sidebarData";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStoreType } from "../../bll/Store";
import { logout } from "../../bll/loginReducer";

export const Navbar = () => {
    const [sidebar, setSidebar] = useState<boolean>(false)
    const isLoggedIn = useSelector<AppRootStoreType, boolean>(state => state.loginReducer.isLogged)
    const dispatch = useDispatch();

    const showSidebar = () => {
        setSidebar(!sidebar)
    }

    const logoutHandle = () => {
        dispatch(logout())
    }

    return <>
        <div className={ style.navbar }>
            <NavLink to="#" className={ style.menuBars }>
                <FaIcons.FaBars onClick={ showSidebar }/>
            </NavLink>
            {isLoggedIn ? <a className={ style.login } onClick={logoutHandle}>
                logout
            </a> : <NavLink to="/login" className={ style.login }>Login</NavLink>}

        </div>
        <nav
            className={ sidebar ? `${ style['navMenu'] } ${ style['active'] }` : style['navMenu'] }>
            <ul className={ style.navMenuItems } onClick={ showSidebar }>
                <li className={ style.navbarToggle }>
                    <NavLink to="#" className={ style.menuBars }>
                        <AiIcons.AiOutlineClose/>
                    </NavLink>
                </li>
                { sidebarData.map((item, index) => {
                    return (
                        <li key={ index } className={ style.navText }>
                            <NavLink to={ item.path }>
                                <span>{ item.title }</span>
                            </NavLink>
                        </li>
                    );
                }) }
            </ul>
        </nav>
    </>
}