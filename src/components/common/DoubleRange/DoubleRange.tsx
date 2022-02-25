/* eslint-disable no-unused-expressions */

import { FC, memo, useCallback } from 'react';

import { Slider } from '@mui/material';

type SuperDoubleRangePropsType = {
  onChangeRange?: (value: number | number[]) => void;
  value?: number | number[];
  min: number;
  max: number;
};

export const DoubleRange: FC<SuperDoubleRangePropsType> = memo(
  ({ onChangeRange, value, ...restProps }) => {
    const onChangeCallback = useCallback(
      (e: Event, valueArr: number | number[]): void => {
        onChangeRange && onChangeRange(valueArr);
      },
      [onChangeRange],
    );

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
  },
);
