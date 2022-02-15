/* eslint-disable react/no-unescaped-entities */
import { FC } from 'react';

import style from './SendEmail.module.css';

export const SendEmail: FC = () => (
  <div className={style.container}>
    <h1>Check email</h1>

    <h4>We've sent an Email with instructions to your Email</h4>
  </div>
);
