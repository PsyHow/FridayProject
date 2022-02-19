import { ReactElement, useEffect } from 'react';

import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { LoginData } from '../api/authTypes';
import { loginTC } from '../dal/authReducer/authThunks';

import style from './Login.module.scss';

import { PATH } from 'components/Routes';
import { validateEmail } from 'const';
import { selectError } from 'selectors/appSelectors';
import { selectIsLoggedIn } from 'selectors/authSelectors';

export const Login = (): ReactElement => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

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
      } else if (validateEmail(values.email)) {
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

  const inputEmailStyle = `${style.input} ${
    formik.errors.email ? style.errorInput : style.input
  }`;
  const inputPasswordStyle = `${style.input} ${
    formik.errors.password ? style.errorInput : style.input
  }`;

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate(PATH.PROFILE);
    }
  }, [isLoggedIn]);

  return (
    <div className={style.loginPage}>
      <form onSubmit={formik.handleSubmit}>
        <h1>It-incubator</h1>
        <h2>Sign In</h2>
        <div className={style.inputs}>
          <input
            className={inputEmailStyle}
            placeholder="Email"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <span className={style.error}>{formik.errors.email}</span>
          ) : (
            <span className={style.error} />
          )}
          <input
            className={inputPasswordStyle}
            type="password"
            placeholder="Password"
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password ? (
            <span className={style.error}>{formik.errors.password}</span>
          ) : (
            <span className={style.error} />
          )}
        </div>

        <NavLink to="/restore" className={style.forgot}>
          Forgot Password
        </NavLink>

        {error ? (
          <span className={style.error}>{error}</span>
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
