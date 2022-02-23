import { ChangeEvent, FC, memo } from 'react';

import style from './Search.module.scss';

interface SearchProps {
  search: string;
  handleChangeSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Search: FC<SearchProps> = memo(({ search, handleChangeSearch }) => (
  <input
    className={style.search}
    type="search"
    placeholder="Search"
    value={search}
    onChange={handleChangeSearch}
  />
));
