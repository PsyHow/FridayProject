/* eslint-disable no-nested-ternary */
import { ReactElement, useEffect } from 'react';

import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import Button from '../../../../../components/common/Button/Button';

import style from './Restore.module.scss';

import { AppRootStoreType } from 'bll/Store';
import { Preloader } from 'components/Preloader/Preloader';
import { PATH } from 'components/Routes';
import { validateEmail } from 'const';
import { recoverTC } from 'features/authorization/dal/registrationReducer/registrationThunks';
import { selectError } from 'selectors/appSelectors';
import { selectIsFetching } from 'selectors/authSelectors';

export const Restore = (): ReactElement => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isFetching = useSelector(selectIsFetching);
  const sendEmail = useSelector<AppRootStoreType, boolean>(
    state => state.registrationReducer.sendEmail,
  );
  const error = useSelector(selectError);

  useEffect(() => {
    if (sendEmail) {
      navigate(PATH.SEND_EMAIL);
    }
  }, [sendEmail]);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: values => {
      const errors: Partial<{ email: string }> = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (validateEmail(values.email)) {
        errors.email = 'Invalid email address';
      }
      return errors;
    },
    onSubmit: values => {
      dispatch(recoverTC(values.email));
    },
  });

  const inputEmailStyle = `${style.input} ${
    formik.errors.email ? style.errorInput : style.input
  }`;

  return (
    <div className={style.restorePage}>
      {isFetching ? (
        <Preloader />
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <h1>It-incubator</h1>

          <h2>Forgot your password?</h2>

          <input
            className={inputEmailStyle}
            type="email"
            placeholder="Email"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <span className={style.error}>{formik.errors.email}</span>
          ) : (
            <span className={style.error} />
          )}

          <h5>Enter your email address and we will send you further instructions</h5>

          {error ? (
            <span className={style.error}>{error}</span>
          ) : (
            <span className={style.error} />
          )}

          <Button type="submit">Send Instructions</Button>

          <span className={style.description}>Did you remember your password?</span>

          <NavLink to="/">
            <div className={style.logginIn}>Try logging in</div>
          </NavLink>
        </form>
      )}
    </div>
  );
};
