import React, { FC } from 'react';

import { Navigate } from 'react-router-dom';

import Button from '../../../../../components/common/Button/Button';
import SuperInputText from '../../../../../components/common/Input/Input';

import style from './NewPassword.module.scss';

import { Preloader } from 'components/Preloader/Preloader';

type PropsType = {
  onChange: (value: string) => void;
  password: string;
  error: string | null;
  onSubmit: () => void;
  isFetching: boolean;
  confirmPass: string;
  onChangeConfirmPass: (value: string) => void;
  setNewPassword: boolean;
};

export const NewPassword: FC<PropsType> = ({
  onChange,
  password,
  error,
  onSubmit,
  isFetching,
  confirmPass,
  onChangeConfirmPass,
  setNewPassword,
}) => {
  if (setNewPassword) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      {isFetching ? (
        <Preloader />
      ) : (
        <div className={style.container}>
          <div className={style.title}>It-incubator</div>
          <span>Create new password</span>
          <SuperInputText
            type="password"
            placeholder="Enter new password"
            onChangeText={onChange}
            value={password}
          />
          <SuperInputText
            type="password"
            placeholder="Confirm new password"
            onChangeText={onChangeConfirmPass}
            value={confirmPass}
            error={error}
          />
          <h5>Create new password and we will send you further instructions to email</h5>
          <Button onClick={onSubmit} disabled={isFetching}>
            Create new password
          </Button>
        </div>
      )}
    </div>
  );
};
