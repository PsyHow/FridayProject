import { useState } from 'react';

import { useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce/lib';

import { AppRootStoreType } from 'bll/Store';

export const useCardCountChange = (): {
  debounceMinCount: number;
  debounceMaxCount: number;
  onChangeHandler: (values: number | number[]) => void;
  minCount: number;
  maxCount: number;
} => {
  const { minCardsCount, maxCardsCount } = useSelector(
    (state: AppRootStoreType) => state.cardPacksReducer,
  );
  const [minCount, setMinCount] = useState(minCardsCount);
  const [maxCount, setMaxCount] = useState(maxCardsCount);
  const [debounceMinCount] = useDebounce(minCount, 2000);
  const [debounceMaxCount] = useDebounce(maxCount, 2000);

  const onChangeHandler = (values: number | number[]): void => {
    if (Array.isArray(values)) {
      setMinCount(values[0]);
      setMaxCount(values[1]);
    }
  };

  return { debounceMinCount, debounceMaxCount, onChangeHandler, minCount, maxCount };
};
