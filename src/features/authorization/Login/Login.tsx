import { ChangeEvent, FC } from 'react';

import { NavLink } from 'react-router-dom';

import style from './Login.module.scss';

type LoginProps = {
  email: string;
  onEmailChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  password: string;
  onPasswordChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
  onLoginButtonClick: () => Promise<void>;
};

export const Login: FC<LoginProps> = ({
  email,
  error,
  onLoginButtonClick,
  onEmailChangeHandler,
  onPasswordChangeHandler,
  password,
}) => (
  <div className={style.loginPage}>
    <form className={style.formWrapper}>
      <h1>It-incubator</h1>
      <h2>Sign In</h2>
      <div className={style.inputs}>
        <input
          placeholder="Email"
          value={email}
          onChange={onEmailChangeHandler}
          className={style.input}
        />
        <input
          value={password}
          type="password"
          placeholder="Password"
          onChange={onPasswordChangeHandler}
          className={style.input}
        />
      </div>

      <NavLink to="/restore" className={style.forgot}>
        Forgot Password
      </NavLink>

      {error ? (
        <span className={style.error}>{error}</span>
      ) : (
        <span className={style.error} />
      )}

      <button type="button" onClick={onLoginButtonClick} className={style.button}>
        Login
      </button>

      <span className={style.dontHaveAcc}>Don’t have an account?</span>

      <NavLink to="/signup" className={style.signUp}>
        Sign Up
      </NavLink>
    </form>
  </div>
);
