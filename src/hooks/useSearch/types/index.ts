import { ChangeEvent } from 'react';

export type useSearchReturnType = {
  debouncingValue: string;
  search: string;
  handleChangeSearch: (event: ChangeEvent<HTMLInputElement>) => void;
};
