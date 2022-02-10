import { FC, useState } from 'react';

import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import style from './Navbar.module.css';
import { sidebarData } from './sidebarData';

import { AppRootStoreType } from 'bll/Store';
import { logout } from 'features/authorization/dal/authReducer/authThunks';

export const Navbar: FC = () => {
  const [sidebar, setSidebar] = useState<boolean>(false);
  const isLoggedIn = useSelector<AppRootStoreType, boolean>(
    state => state.authReducer.isLogged,
  );
  const dispatch = useDispatch();

  const showSidebar = (): void => {
    setSidebar(!sidebar);
  };

  const logoutHandle = (): void => {
    dispatch(logout());
  };

  return (
    <>
      <div className={style.navbar}>
        <NavLink to="#" className={style.menuBars}>
          <FaIcons.FaBars onClick={showSidebar} />
        </NavLink>
        {isLoggedIn ? (
          <NavLink to="/login" className={style.login} onClick={logoutHandle}>
            logout
          </NavLink>
        ) : (
          <NavLink to="/login" className={style.login}>
            Login
          </NavLink>
        )}
      </div>
      <nav className={sidebar ? `${style.navMenu} ${style.active}` : style.navMenu}>
        <ul className={style.navMenuItems} onClick={showSidebar}>
          <li className={style.navbarToggle}>
            <NavLink to="#" className={style.menuBars}>
              <AiIcons.AiOutlineClose />
            </NavLink>
          </li>
          {sidebarData.map(item => (
            <li key={item.id} className={style.navText}>
              <NavLink to={item.path}>
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
