import { FC, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppRootStoreType } from '../../../../../bll/Store';

import { NewPassword } from './NewPassword';

import { setError } from 'features/authorization/dal/authReducer/authActions';
import { newPassword } from 'features/authorization/dal/registrationReducer/registrationThunks';
import { selectError, selectIsFetching } from 'selectors/authSelectors';

export const NewPasswordContainer: FC = () => {
  const { token } = useParams<'token'>();
  const [pass, setPass] = useState<string>('');
  const [confirmPass, setConfirmPass] = useState<string>('');
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const isFetching = useSelector(selectIsFetching);
  const setNewPassword = useSelector<AppRootStoreType, boolean>(
    state => state.registrationReducer.setNewPassword,
  );

  const onSubmit = (): void => {
    if (pass !== confirmPass) {
      dispatch(setError('passwords must be match'));
    } else {
      dispatch(newPassword(pass, token || ''));
    }
  };

  const onChangePass = (value: string): void => {
    setPass(value);
    dispatch(setError(null));
  };
  const onChangeConfirmPass = (value: string): void => {
    setConfirmPass(value);
  };

  return (
    <NewPassword
      onChange={onChangePass}
      password={pass}
      confirmPass={confirmPass}
      error={error}
      onSubmit={onSubmit}
      isFetching={isFetching}
      onChangeConfirmPass={onChangeConfirmPass}
      setNewPassword={setNewPassword}
    />
  );
};
