import { ReactElement, useEffect } from 'react';

import { FormikProvider, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { recoverPassword } from 'bll/middlewares';
import { Button } from 'components/common/Button';
import { TextField } from 'components/common/TextField';
import style from 'components/PasswordRestore/style/restore.module.scss';
import { Preloader } from 'components/Preloader';
import { validateEmail } from 'const';
import { PATH } from 'enums';
import { selectError } from 'selectors/appSelectors';
import { selectIsFetching } from 'selectors/authSelectors';
import { selectHasSendMail } from 'selectors/registrationReducer';

export const Restore = (): ReactElement => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isFetching = useSelector(selectIsFetching);
  const sendEmail = useSelector(selectHasSendMail);
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
      dispatch(recoverPassword(values.email));
    },
  });

  return (
    <div className={style.restorePage}>
      {isFetching ? (
        <Preloader />
      ) : (
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <h1>It-incubator</h1>

            <h2>Forgot your password?</h2>

            <TextField name="email" type="text" label="Email" />

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
        </FormikProvider>
      )}
    </div>
  );
};
