import { ChangeEvent, useCallback, useMemo, useState } from 'react';

import { useDebounce } from 'use-debounce';

import { useSearchReturnType } from './types';

export const useSearch = (): useSearchReturnType => {
  const [search, setSearch] = useState<string>('');
  const [debouncingValue] = useDebounce(search, 1000);

  const handleSetSeachValue = (newValue: string): void => {
    setSearch(newValue);
  };

  const handleChangeSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      handleSetSeachValue(event.currentTarget.value);
    },
    [handleSetSeachValue],
  );

  return useMemo(
    () => ({ debouncingValue, search, handleChangeSearch }),
    [debouncingValue, search, handleChangeSearch],
  );
};
