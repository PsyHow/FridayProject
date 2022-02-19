import { ReactElement } from 'react';

import { FormikProvider, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { signUpTC } from '../dal/registrationReducer/registrationThunks';

import style from './signup.module.scss';

import { TextField } from 'components/common/TextField/TextField';
import { Preloader } from 'components/Preloader/Preloader';
import { PATH } from 'components/Routes';
import { validateEmail } from 'const';
import { selectError } from 'selectors/appSelectors';
import { selectIsFetching } from 'selectors/authSelectors';

type SignUpData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignUp = (): ReactElement => {
  const dispatch = useDispatch();
  const isFetching = useSelector(selectIsFetching);
  const error = useSelector(selectError);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: values => {
      const errors: Partial<SignUpData> = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (validateEmail(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length <= 5) {
        errors.password = 'must be more than five characters';
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = 'Required';
      } else if (values.confirmPassword.length <= 5) {
        errors.confirmPassword = 'must be more than five characters';
      }
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'passwords must be match';
      }
      return errors;
    },
    onSubmit: values => {
      dispatch(signUpTC(values.email, values.password));
    },
  });
  return (
    <div className={style.container}>
      {isFetching ? (
        <Preloader />
      ) : (
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <h1>It-incubator</h1>

            <h2>Sign Up</h2>

            <TextField name="email" type="text" label="Email" />
            <TextField name="password" type="password" label="Password" />
            <TextField name="confirmPassword" type="password" label="Confirm Password" />

            {error ? (
              <span className={style.error}>{error}</span>
            ) : (
              <span className={style.error} />
            )}

            <div className={style.buttons}>
              <NavLink to={PATH.LOGIN}>
                <button type="button">Cancel</button>
              </NavLink>

              <button type="submit">Register</button>
            </div>
          </form>
        </FormikProvider>
      )}
    </div>
  );
};
