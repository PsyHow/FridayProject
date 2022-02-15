import { ChangeEvent, FC, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { AppRootStoreType } from 'bll/Store';
import { loginTC } from 'features/authorization/dal/authReducer/authThunks';
import { setError } from 'features/authorization/dal/registrationReducer/registrationActions';
import { Login } from 'features/authorization/Login/Login';

export const LoginContainer: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector<AppRootStoreType, string | null>(
    state => state.registrationReducer.error,
  );
  const isLogged = useSelector<AppRootStoreType, boolean>(
    state => state.authReducer.isLogged,
  );

  const [email, setEmail] = useState('nya-admin@nya.nya');
  const [password, setPassword] = useState('1qazxcvBG');
  const [rememberMe] = useState(true);

  const onEmailChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setError(null));
    const text = e.currentTarget.value;
    setEmail(text);
  };

  const onPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setError(null));
    setPassword(e.currentTarget.value);
  };

  const onLoginButtonClick = async (): Promise<any> => {
    dispatch(loginTC({ email, rememberMe, password }));
  };

  if (isLogged) {
    return <Navigate to="/profile" />;
  }

  return (
    <Login
      email={email}
      error={error}
      onLoginButtonClick={onLoginButtonClick}
      onEmailChangeHandler={onEmailChangeHandler}
      onPasswordChangeHandler={onPasswordChangeHandler}
      password={password}
    />
  );
};
