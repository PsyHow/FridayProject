import { FC } from 'react';

import { NavLink } from 'react-router-dom';

import SuperInputText from '../../../components/common/Input/Input';

import style from './signup.module.scss';

import { Preloader } from 'components/Preloader/Preloader';

type PropsType = {
  email: string;
  onChangeEmail: (value: string) => void;
  password: string;
  confirm: string;
  onChangePassword: (value: string) => void;
  onChangeConfirmPassword: (value: string) => void;
  isFetching: boolean;
  onClickHandler: () => void;
  error: null | string;
};

export const SignUp: FC<PropsType> = ({
  email,
  onChangeEmail,
  error,
  password,
  confirm,
  onChangePassword,
  onClickHandler,
  onChangeConfirmPassword,
  isFetching,
}) => (
  <div>
    {isFetching ? (
      <Preloader />
    ) : (
      <div className={style.container}>
        <div className={style.title}>It-incubator</div>
        <span>Sign Up</span>

        <SuperInputText
          type="email"
          placeholder="Email"
          onChangeText={onChangeEmail}
          value={email}
        />
        <SuperInputText
          type="password"
          placeholder="Password"
          onChangeText={onChangePassword}
          value={password}
          error={error}
        />
        <SuperInputText
          type="password"
          placeholder="Confirm password"
          onChangeText={onChangeConfirmPassword}
          value={confirm}
          error={error}
        />

        <div className={style.buttons}>
          <NavLink to="/login">
            <button type="button">Cancel</button>
          </NavLink>
          <button type="button" onClick={onClickHandler} disabled={isFetching}>
            Register
          </button>
        </div>
      </div>
    )}
  </div>
);
