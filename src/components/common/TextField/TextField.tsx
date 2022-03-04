import { FC, memo } from 'react';

import { useField } from 'formik';

import style from './TextField.module.scss';

type TextFieldProps = {
  label: string;
  name: string;
  type: string;
};

export const TextField: FC<TextFieldProps> = memo(({ label, ...props }) => {
  const [field, meta] = useField(props.name);

  const inputStyle = `${style.input} ${
    meta.touched && meta.error ? style.errorInput : style.input
  }`;

  return (
    <div className={style.textFieldContainer}>
      <label>{label}</label>
      <input className={inputStyle} {...field} {...props} />

      {meta.touched && meta.error ? (
        <div className={style.error}>{meta.error}</div>
      ) : (
        <div className={style.error} />
      )}
    </div>
  );
});
