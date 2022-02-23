/* eslint-disable no-unused-expressions */
/* eslint-disable react/require-default-props */
import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, memo } from 'react';

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
type SuperInputTextPropsType = DefaultInputPropsType & {
  // и + ещё пропсы которых нет в стандартном инпуте
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  error?: string;
  spanClassName?: string;
};

export const Input: React.FC<SuperInputTextPropsType> = memo(
  ({
    onChange,
    onChangeText,

    ...restProps
  }) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>): void => {
      onChange;

      onChangeText && onChangeText(e.currentTarget.value);
    };

    return <input type="text" onChange={onChangeCallback} {...restProps} />;
  },
);
