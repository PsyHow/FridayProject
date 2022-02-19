import { FC, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { AppRootStoreType } from '../../../bll/Store';

import { SignUp } from './SignUp';

import { setError } from 'bll/appReducer';
import { PATH } from 'components/Routes';
import { signUpTC } from 'features/authorization/dal/registrationReducer/registrationThunks';
import { selectError } from 'selectors/appSelectors';
import { selectIsFetching } from 'selectors/authSelectors';

export const SignUpContainer: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');

  const dispatch = useDispatch();
  const isFetching = useSelector(selectIsFetching);
  const error = useSelector(selectError);
  const confirmRegistrationDataAC = useSelector<AppRootStoreType, boolean>(
    state => state.registrationReducer.confirmRegistrationData,
  );

  const onChangeEmail = (value: string): void => {
    setEmail(value);
    dispatch(setError(null));
  };

  const onChangePassword = (value: string): void => {
    setPassword(value);
    dispatch(setError(null));
  };

  const onChangeConfirmPassword = (value: string): void => {
    setConfirm(value);
    dispatch(setError(null));
  };

  const onClickHandle = (): void => {
    if (email === '') {
      dispatch(setError('Required'));
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      dispatch(setError('Invalid email address'));
    }

    if (password !== confirm) {
      dispatch(setError('Passwords should be match'));
    }

    if (password.length < 7) {
      dispatch(setError('Password should be more than 7 characters'));
    }

    if (!error) {
      dispatch(signUpTC(email, password));
    }
  };

  if (confirmRegistrationDataAC) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <SignUp
      email={email}
      onChangeEmail={onChangeEmail}
      onChangeConfirmPassword={onChangeConfirmPassword}
      password={password}
      onChangePassword={onChangePassword}
      confirm={confirm}
      isFetching={isFetching}
      onClickHandler={onClickHandle}
      error={error}
    />
  );
};
