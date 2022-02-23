import { ReactElement, useEffect } from 'react';

import { FormikProvider, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import style from './Login.module.scss';

import { TextField } from 'components/common/TextField';
import { validateEmail } from 'const';
import { PATH } from 'enums';
import { loginTC, LoginData } from 'features/authorization';
import { selectError } from 'selectors/appSelectors';
import { selectIsLoggedIn } from 'selectors/authSelectors';

export const Login = (): ReactElement => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: 'viktorburnyshev@gmail.com',
      password: '12345Qwe',
      rememberMe: true,
    },
    validate: values => {
      const errors: Partial<LoginData> = {};
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
      return errors;
    },
    onSubmit: values => {
      dispatch(loginTC({ ...values }));
    },
  });

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate(PATH.PROFILE);
    }
  }, [isLoggedIn]);

  return (
    <div className={style.loginPage}>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <h1>It-incubator</h1>

          <h2>Sign In</h2>

          <div className={style.inputs}>
            <TextField name="email" type="text" label="Email" />
            <TextField name="password" type="password" label="Password" />
          </div>

          <NavLink to="/restore" className={style.forgot}>
            Forgot Password
          </NavLink>

          {error ? (
            <span className={style.errorServer}>{error}</span>
          ) : (
            <span className={style.errorServer} />
          )}

          <button type="submit" className={style.button}>
            Login
          </button>

          <span className={style.dontHaveAcc}>Don’t have an account?</span>

          <NavLink to="/signup" className={style.signUp}>
            Sign Up
          </NavLink>
        </form>
      </FormikProvider>
    </div>
  );
};
