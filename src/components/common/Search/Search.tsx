import { FC, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { getCardsTC } from 'features/Cards/bll/cardsThunks';
import { getCardPacksTC } from 'features/Packs/bll/CardPacksThunk';
import { useSearch } from 'hooks/useSearch';

type SearchProps = {
  id?: string;
};

export const Search: FC<SearchProps> = ({ id }) => {
  const dispatch = useDispatch();

  const { debouncingValue, handleChangeSearch, search } = useSearch();

  useEffect(() => {
    if (id) {
      dispatch(getCardsTC({ cardsPack_id: id, cardQuestion: debouncingValue }));
    } else {
      dispatch(
        getCardPacksTC({
          packName: debouncingValue,
        }),
      );
    }
  }, [debouncingValue]);

  return (
    <input
      type="search"
      placeholder="Search"
      value={search}
      onChange={handleChangeSearch}
    />
  );
};
Search.defaultProps = {
  id: '',
};
