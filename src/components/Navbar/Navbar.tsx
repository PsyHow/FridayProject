import style from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { useState } from "react";
import { sidebarData } from "./sidebarData";

export const Navbar = () => {
    const [sidebar, setSidebar] = useState<boolean>(false)

    const showSidebar = () => {
        setSidebar(!sidebar)
    }

    return <>
        <div className={ style.navbar }>
            <NavLink to="#" className={ style.menuBars }>
                <FaIcons.FaBars onClick={ showSidebar }/>
            </NavLink>
            <NavLink to="/login" className={ style.login }>
                Login
            </NavLink>
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