import { ButtonHTMLAttributes, DetailedHTMLProps, FC, memo } from 'react';

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type ButtonProps = DefaultButtonPropsType;

export const Button: FC<ButtonProps> = memo(({ ...restProps }) => (
  <button type="button" {...restProps} />
));
