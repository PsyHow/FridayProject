import { ChangeEvent, useState } from 'react';

import { useDebounce } from 'use-debounce/lib';

export const useSearch = (): {
  debouncingValue: string;
  search: string;
  handleChangeSearch: (event: ChangeEvent<HTMLInputElement>) => void;
} => {
  const [search, setSearch] = useState<string>('');
  const [debouncingValue] = useDebounce(search, 1000);

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.currentTarget.value);
  };

  return { debouncingValue, search, handleChangeSearch };
};
