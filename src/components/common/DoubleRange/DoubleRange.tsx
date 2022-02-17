/* eslint-disable no-unused-expressions */
/* eslint-disable react/require-default-props */
import React from 'react';

import { Slider } from '@mui/material';

type SuperDoubleRangePropsType = {
  onChangeRange?: (value: number | number[]) => void;
  value?: number | number[];
  min: number;
  max: number;
};

export const DoubleRange: React.FC<SuperDoubleRangePropsType> = ({
  onChangeRange,
  value,
  ...restProps
}) => {
  const onChangeCallback = (e: Event, valueArr: number | number[]): void => {
    onChangeRange && onChangeRange(valueArr);
  };

  return (
    <Slider
      value={value}
      min={restProps.min}
      max={restProps.max}
      style={{ width: '133px', color: '#7676EE7D' }}
      onChange={onChangeCallback}
      valueLabelDisplay="on"
    />
  );
};
