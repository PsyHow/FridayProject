/* eslint-disable react/no-unescaped-entities */
import { FC } from 'react';

import style from './SendEmail.module.scss';

import iconPng from 'assets/sendEmail.png';

export const SendEmail: FC = () => (
  <div className={style.container}>
    <div className={style.title}>It-incubator</div>
    <img alt="logo" src={iconPng} />
    <span>Check Email</span>
    <h4>We've sent an Email with instructions to your Email</h4>
  </div>
);
