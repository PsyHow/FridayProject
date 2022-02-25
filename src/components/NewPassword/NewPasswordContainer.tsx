import { ReactElement, useCallback, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { setError } from 'bll/actions';
import { fetchNewPassword } from 'bll/middlewares';
import { NewPassword } from 'components/NewPassword';
import { selectError } from 'selectors/appSelectors';
import { selectIsFetching } from 'selectors/authSelectors';
import { selectSetNewPassword } from 'selectors/registrationReducer';

export const NewPasswordContainer = (): ReactElement => {
  const dispatch = useDispatch();
  const { token } = useParams();

  const error = useSelector(selectError);
  const isFetching = useSelector(selectIsFetching);
  const setNewPassword = useSelector(selectSetNewPassword);

  const [pass, setPass] = useState<string>('');
  const [confirmPass, setConfirmPass] = useState<string>('');

  const onSubmit = useCallback(() => {
    if (pass !== confirmPass) {
      dispatch(setError('passwords must be match'));
    } else {
      dispatch(fetchNewPassword(pass, token || ''));
    }
  }, [pass, confirmPass, token]);

  const onChangePass = useCallback((value: string) => {
    setPass(value);
    dispatch(setError(null));
  }, []);

  const onChangeConfirmPass = useCallback((value: string) => {
    setConfirmPass(value);
  }, []);

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
