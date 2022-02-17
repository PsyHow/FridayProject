import { ChangeEvent, FC } from 'react';

type SearchProps = {
  search: string;
  handleChangeSearch: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Search: FC<SearchProps> = ({ search, handleChangeSearch }) => (
  <input
    type="search"
    placeholder="Search"
    value={search}
    onChange={handleChangeSearch}
  />
);
