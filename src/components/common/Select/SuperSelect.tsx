import React, { SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent } from 'react';

type DefaultSelectPropsType = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

type SuperSelectPropsType = DefaultSelectPropsType & {
  // eslint-disable-next-line react/require-default-props
  options?: any[];
  // eslint-disable-next-line react/require-default-props
  onChangeOption?: (option: any) => void;
};

export const SuperSelect: React.FC<SuperSelectPropsType> = ({
  options,
  onChange,
  onChangeOption,
  ...restProps
}) => {
  const mappedOptions: any[] = options
    ? options.map((o, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <option key={`${i}${o}`} value={o}>
          {o}
        </option>
      ))
    : [];

  const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>): void => {
    // eslint-disable-next-line no-unused-expressions
    onChange && onChange(e);
    // eslint-disable-next-line no-unused-expressions
    onChangeOption && onChangeOption(e.currentTarget.value);
  };

  return (
    <select onChange={onChangeCallback} {...restProps}>
      {mappedOptions}
    </select>
  );
};
