import { FC } from 'react';

import Button from '../../../components/common/Button/Button';
import SuperInputText from '../../../components/common/Input/Input';
import style from '../forgot/ui/PasswordRestore/Restore.module.css';

import { Preloader } from 'components/Preloader/Preloader';

type PropsType = {
  email: string;
  onChangeEmail: (value: string) => void;
  password: string;
  onChangePassword: (value: string) => void;
  isFetching: boolean;
  onClickHandler: () => void;
  error: null | string;
};

export const SignUp: FC<PropsType> = ({
  email,
  onChangeEmail,
  error,
  password,
  onChangePassword,
  onClickHandler,
  isFetching,
}) => (
  <div>
    {isFetching ? (
      <Preloader />
    ) : (
      <div className={style.container}>
        <h1>Sign Up</h1>
        <SuperInputText
          type="email"
          placeholder="Enter Email"
          onChangeText={onChangeEmail}
          value={email}
        />
        <SuperInputText
          type="password"
          placeholder="Enter Password"
          onChangeText={onChangePassword}
          value={password}
          error={error}
        />
        <Button onClick={onClickHandler} disabled={isFetching}>
          Register
        </Button>
      </div>
    )}
  </div>
);
