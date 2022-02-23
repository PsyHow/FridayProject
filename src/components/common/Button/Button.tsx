/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/button-has-type */
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import style from './Button.module.css';

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type SuperButtonPropsType = DefaultButtonPropsType;

export const Button: React.FC<SuperButtonPropsType> = ({ className, ...restProps }) => (
  <button
    className={style.button}
    {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
  />
);
