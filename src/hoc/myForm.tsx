import { ReactElement } from 'react';

import { Field, Form, FormikErrors, FormikProps, withFormik } from 'formik';

import { validateEmail } from 'const';
import { loginTC } from 'features/authorization/dal/authReducer/authThunks';

type MyFormProps = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
  message: string;
};

type FormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type OtherProps = {
  message: string;
};

const InnerForm = (props: OtherProps & FormikProps<FormValues>): ReactElement => {
  const { touched, errors, isSubmitting, message } = props;
  return (
    <Form>
      <h1>{message}</h1>
      <Field type="email" name="email" />
      {touched.email && errors.email && <div>{errors.email}</div>}

      <Field type="password" name="password" />
      {touched.password && errors.password && <div>{errors.password}</div>}

      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  );
};

export const MyForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: props => ({
    email: '',
    password: '',
    rememberMe: true,
  }),

  // Add a custom validation function (this can be async too!)
  validate: (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {};
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

  handleSubmit: values => {
    dispatch(loginTC({ ...values }));
    // do submitting things
  },
})(InnerForm);
