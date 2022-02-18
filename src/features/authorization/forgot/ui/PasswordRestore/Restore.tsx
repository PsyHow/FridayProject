/* eslint-disable no-nested-ternary */
import { FC } from 'react';

import { NavLink } from 'react-router-dom';

import Button from '../../../../../components/common/Button/Button';
import Input from '../../../../../components/common/Input/Input';
import { SendEmail } from '../SendEmail/SendEmail';

import style from './Restore.module.scss';

import { Preloader } from 'components/Preloader/Preloader';

type PropsType = {
  email: string;
  error: null | string;
  onChangeText: (value: string) => void;
  onClickHandler: () => void;
  isFetching: boolean;
  sendEmail: boolean;
};

export const Restore: FC<PropsType> = ({
  email,
  error,
  onChangeText,
  onClickHandler,
  isFetching,
  sendEmail,
}) => (
  <div className={style.box}>
    {isFetching ? (
      <Preloader />
    ) : !sendEmail ? (
      <div className={style.container}>
        <div className={style.title}>It-incubator</div>

        <div className={style.question}>Forgot your password?</div>

        <Input
          type="email"
          placeholder="Email"
          onChangeText={onChangeText}
          value={email}
          error={error}
        />

        <h5>Enter your email address and we will send you further instructions</h5>

        {error ? (
          <span className={style.error}>{error}</span>
        ) : (
          <span className={style.error} />
        )}

        <Button onClick={onClickHandler} disabled={isFetching}>
          Send Instructions
        </Button>

        <span>Did you remember your password?</span>

        <NavLink to="/">
          <div className={style.logginIn}>Try logging in</div>
        </NavLink>
      </div>
    ) : (
      <SendEmail />
    )}
  </div>
);
