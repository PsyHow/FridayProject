import { ReactElement } from 'react';

import { NavLink } from 'react-router-dom';

import style from './style/header.module.scss';

import cardPackLogo from 'assets/cardPack.png';
import profileLogo from 'assets/profile.png';
import { PATH } from 'enums';

const activeStyle = ({ isActive }: any): string => (isActive ? style.activeLink : '');

export const Header = (): ReactElement => (
  <div className={style.container}>
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
);
