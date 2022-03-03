/* eslint-disable react/require-default-props */
import { FC, useState } from 'react';

import { useDispatch } from 'react-redux';

import style from './style/sorting.module.scss';
import { SortingProps } from './types';

import { getPackSorting, setPacksCurrentPage } from 'bll/actions/CardPacks';
import { fetchCardPacks } from 'bll/middlewares';

type SortType = 'UP' | 'DOWN';

export const Sorting: FC<SortingProps> = ({ sortName, id }) => {
  const dispatch = useDispatch();

  const [sort, setSort] = useState<SortType>('UP');

  const setSortUp = (): void => {
    dispatch(setPacksCurrentPage(1));
    setSort('DOWN');

    if (id) {
      dispatch(getPackSorting(`0${sortName}`));

      dispatch(
        fetchCardPacks({
          user_id: id,
          sortPacks: `0${sortName}`,
          pageCount: 5,
        }),
      );
    } else {
      dispatch(getPackSorting(`0${sortName}`));

      dispatch(
        fetchCardPacks({
          sortPacks: `0${sortName}`,
          pageCount: 5,
        }),
      );
    }
  };

  const setSortDown = (): void => {
    dispatch(setPacksCurrentPage(1));
    setSort('UP');

    if (id) {
      dispatch(getPackSorting(`1${sortName}`));

      dispatch(
        fetchCardPacks({
          user_id: id,
          sortPacks: `1${sortName}`,
          pageCount: 5,
        }),
      );
    } else {
      dispatch(getPackSorting(`1${sortName}`));

      dispatch(
        fetchCardPacks({
          sortPacks: `1${sortName}`,
          pageCount: 5,
        }),
      );
    }
  };

  return (
    <div>
      {sort === 'DOWN' ? (
        <div aria-hidden="true" onClick={setSortDown} className={style.sortingDown} />
      ) : (
        <div aria-hidden="true" onClick={setSortUp} className={style.sortingUp} />
      )}
    </div>
  );
};
