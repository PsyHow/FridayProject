import { ReactElement } from 'react';

import { FormikProvider, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

import style from './style/newPassword.module.scss';
import { NewPasswordData } from './types';

import { fetchNewPassword } from 'bll/middlewares';
import { Button } from 'components/common/Button';
import { TextField } from 'components/common/TextField';
import { Preloader } from 'components/Preloader';
import { PATH } from 'enums';
import { selectIsFetching } from 'selectors/authSelectors';
import { selectSetNewPassword } from 'selectors/registrationReducer';

export const NewPassword = (): ReactElement => {
  const dispatch = useDispatch();
  const { token } = useParams();

  const isFetching = useSelector(selectIsFetching);
  const setNewPassword = useSelector(selectSetNewPassword);

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: values => {
      const errors: Partial<NewPasswordData> = {};
      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length <= 5) {
        errors.password = 'must be more than five characters';
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = 'Required';
      } else if (values.password.length <= 5) {
        errors.confirmPassword = 'must be more than five characters';
      }

      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'passwords must be match';
      }

      return errors;
    },
    onSubmit: values => {
      dispatch(fetchNewPassword(values.confirmPassword, token || ''));
    },
  });

  if (setNewPassword) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <div className={style.newPasswordPage}>
      {isFetching ? (
        <Preloader />
      ) : (
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <div className={style.title}>It-incubator</div>
            <span>Create new password</span>
            <div className={style.inputs}>
              <TextField label="Enter new password" name="password" type="password" />
              <TextField
                label="Confirm new password"
                name="confirmPassword"
                type="password"
              />
            </div>

            <h5>
              Create new password and we will send you further instructions to email
            </h5>

            <Button type="submit">Create new password</Button>
          </form>
        </FormikProvider>
      )}
    </div>
  );
};
