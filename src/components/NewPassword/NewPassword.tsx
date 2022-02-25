import { FC, memo } from 'react';

import { Navigate } from 'react-router-dom';

import { Button } from 'components/common/Button';
import { Input } from 'components/common/Input/Input';
import style from 'components/NewPassword/style/newPassword.module.scss';
import { NewPasswordInterface } from 'components/NewPassword/types';
import { Preloader } from 'components/Preloader';
import { PATH } from 'enums';

export const NewPassword: FC<NewPasswordInterface> = memo(
  ({
    onChange,
    password,
    onSubmit,
    isFetching,
    confirmPass,
    onChangeConfirmPass,
    setNewPassword,
  }) => {
    if (setNewPassword) {
      return <Navigate to={PATH.LOGIN} />;
    }

    return (
      <div>
        {isFetching ? (
          <Preloader />
        ) : (
          <form className={style.container}>
            <div className={style.title}>It-incubator</div>
            <span>Create new password</span>
            <Input
              type="password"
              placeholder="Enter new password"
              onChangeText={onChange}
              value={password}
            />
            <Input
              type="password"
              placeholder="Confirm new password"
              onChangeText={onChangeConfirmPass}
              value={confirmPass}
            />
            <h5>
              Create new password and we will send you further instructions to email
            </h5>
            <Button onClick={onSubmit} disabled={isFetching}>
              Create new password
            </Button>
          </form>
        )}
      </div>
    );
  },
);
