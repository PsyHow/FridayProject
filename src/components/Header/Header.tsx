import { ReactElement } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import style from './style/header.module.scss';

import cardPackLogo from 'assets/cardPack.png';
import profileLogo from 'assets/profile.png';
import { logout } from 'bll/middlewares';
import { PATH } from 'enums';
import { selectIsLoggedIn } from 'selectors/authSelectors';

const activeStyle = ({ isActive }: any): string => (isActive ? style.activeLink : '');

export const Header = (): ReactElement => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleClickLogout = (): void => {
    dispatch(logout());
  };
  return (
    <div className={style.container}>
      {isLoggedIn ? (
        <div>
          <NavLink to={PATH.LOGIN} className={style.login} onClick={handleClickLogout}>
            logout
          </NavLink>
          <div className={style.selectPage}>
            <NavLink to={PATH.CARD_PACKS} className={activeStyle}>
              <div>
                <img alt="logotype" src={cardPackLogo} />

                <span>Pack List</span>
              </div>
            </NavLink>

            <NavLink to={PATH.PROFILE} className={activeStyle}>
              <div>
                <img alt="logotype" src={profileLogo} />

                <span>Profile</span>
              </div>
            </NavLink>
          </div>
        </div>
      ) : (
        <NavLink to={PATH.LOGIN} className={style.login}>
          Login
        </NavLink>
      )}
    </div>
  );
};
