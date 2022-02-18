import { ReactElement } from 'react';

import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { LoginData } from '../api/authTypes';
import { loginTC } from '../dal/authReducer/authThunks';

import style from './Login.module.scss';

import { selectError } from 'selectors/authSelectors';

export const Login = (): ReactElement => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
    validate: values => {
      const errors: Partial<LoginData> = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.email = 'Required';
      } else if (values.password.length <= 5) {
        errors.password = 'must be more than five characters';
      }
      return errors;
    },
    onSubmit: values => {
      dispatch(loginTC({ ...values }));
    },
  });

  const errorsField = formik.errors.email || formik.errors.password || error;

  return (
    <div className={style.loginPage}>
      <form onSubmit={formik.handleSubmit} className={style.formWrapper}>
        <h1>It-incubator</h1>
        <h2>Sign In</h2>
        <div className={style.inputs}>
          <input
            placeholder="Email"
            className={style.input}
            {...formik.getFieldProps('email')}
          />
          <input
            type="password"
            placeholder="Password"
            className={style.input}
            {...formik.getFieldProps('password')}
          />
        </div>

        <NavLink to="/restore" className={style.forgot}>
          Forgot Password
        </NavLink>

        {errorsField ? (
          <span className={style.error}>{errorsField}</span>
        ) : (
          <span className={style.error} />
        )}

        <button type="submit" className={style.button}>
          Login
        </button>

        <span className={style.dontHaveAcc}>Don’t have an account?</span>

        <NavLink to="/signup" className={style.signUp}>
          Sign Up
        </NavLink>
      </form>
    </div>
  );
};
