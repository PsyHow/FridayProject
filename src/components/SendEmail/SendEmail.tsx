import { ReactElement } from 'react';

import iconPng from 'assets/sendEmail.png';
import style from 'components/SendEmail/style/sendEmail.module.scss';

export const SendEmail = (): ReactElement => (
  <div className={style.container}>
    <div className={style.title}>It-incubator</div>

    <img alt="logo" src={iconPng} />

    <span>Check Email</span>

    <h4>We`ve sent an Email with instructions to your Email</h4>
  </div>
);
