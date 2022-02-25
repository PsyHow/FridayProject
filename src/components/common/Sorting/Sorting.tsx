import { FC } from 'react';

import { useDispatch } from 'react-redux';

import { getCardsSorting, setCardsCurrentPage } from 'bll/actions';
import { getPackSorting, setPacksCurrentPage } from 'bll/actions/CardPacks';
import { fetchCards, fetchCardPacks } from 'bll/middlewares';

export const Sorting: FC<PropsType> = ({ sortName, token }) => {
  const dispatch = useDispatch();

  const setSortUp = (): void => {
    dispatch(setPacksCurrentPage(1));
    dispatch(setCardsCurrentPage(1));
    if (token) {
      dispatch(getCardsSorting(`0${sortName}`));
      dispatch(fetchCards({ cardsPack_id: token }));
    } else {
      // dispatch(getPackSorting(`0${sortName}`));
      dispatch(
        fetchCardPacks({
          sortPacks: `0${sortName}`,
        }),
      );
    }
  };
  const setSortDown = (): void => {
    dispatch(setCardsCurrentPage(1));
    dispatch(setPacksCurrentPage(1));
    if (token) {
      dispatch(getCardsSorting(`1${sortName}`));
      dispatch(fetchCards({ cardsPack_id: token }));
    } else {
      // dispatch(getPackSorting(`1${sortName}`));
      dispatch(
        fetchCardPacks({
          sortPacks: `1${sortName}`,
        }),
      );
    }
  };
  return (
    <div>
      <button type="button" onClick={setSortUp}>
        ▲
      </button>
      <button type="button" onClick={setSortDown}>
        ▼
      </button>
    </div>
  );
};

// types
type PropsType = {
  sortName: string;
  // eslint-disable-next-line react/require-default-props
  token?: string;
};
