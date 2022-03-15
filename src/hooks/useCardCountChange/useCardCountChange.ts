import { useCallback, useMemo, useState } from 'react';

import { useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';

import { useCardCountChangeReturnType } from './types';

import { selectCardMaxValue, selectCardMinValue } from 'selectors/cardPacksSelectors';

export const useCardCountChange = (): useCardCountChangeReturnType => {
  const minCardsCount = useSelector(selectCardMinValue);
  const maxCardsCount = useSelector(selectCardMaxValue);

  const [minCount, setMinCount] = useState(minCardsCount);
  const [maxCount, setMaxCount] = useState(maxCardsCount);
  const [debounceMinCount] = useDebounce(minCount, 2000);
  const [debounceMaxCount] = useDebounce(maxCount, 2000);

  const onChangeHandler = useCallback(
    (values: number | number[]): void => {
      if (Array.isArray(values)) {
        setMinCount(values[0]);
        setMaxCount(values[1]);
      }
    },
    [setMinCount, setMaxCount],
  );

  return useMemo(
    () => ({ debounceMinCount, debounceMaxCount, onChangeHandler, minCount, maxCount }),
    [debounceMinCount, debounceMaxCount, onChangeHandler, minCount, maxCount],
  );
};
