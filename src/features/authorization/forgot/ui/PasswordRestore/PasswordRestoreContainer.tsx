import { FC, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { AppRootStoreType } from '../../../../../bll/Store';

import { Restore } from './Restore';

import { setError } from 'features/authorization/dal/authReducer/authActions';
import { recoverTC } from 'features/authorization/dal/registrationReducer/registrationThunks';
import { selectError, selectIsFetching } from 'selectors/authSelectors';

export const PasswordRestoreContainer: FC = () => {
  const [email, setEmail] = useState<string>('');

  const error = useSelector(selectError);
  const isFetching = useSelector(selectIsFetching);
  const sendEmail = useSelector<AppRootStoreType, boolean>(
    state => state.registrationReducer.sendEmail,
  );
  const dispatch = useDispatch();

  const onChangeEmail = (value: string): void => {
    setEmail(value);
    if (error !== null) {
      dispatch(setError(error));
    }
    dispatch(setError(null));
  };

  const onClickHandler = (): void => {
    if (email === '') {
      dispatch(setError('Required'));
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      dispatch(setError('Invalid email address'));
    } else {
      dispatch(recoverTC(email));
      setEmail('');
    }
  };

  return (
    <Restore
      email={email}
      onChangeText={onChangeEmail}
      onClickHandler={onClickHandler}
      error={error}
      isFetching={isFetching}
      sendEmail={sendEmail}
    />
  );
};
