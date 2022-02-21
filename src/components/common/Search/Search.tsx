import { ChangeEvent, FC } from 'react';

import style from './Search.module.scss';

type SearchProps = {
  search: string;
  handleChangeSearch: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Search: FC<SearchProps> = ({ search, handleChangeSearch }) => (
  <input
    className={style.search}
    type="search"
    placeholder="Search"
    value={search}
    onChange={handleChangeSearch}
  />
);
