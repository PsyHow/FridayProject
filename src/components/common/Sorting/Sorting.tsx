import { FC } from 'react';

import { useDispatch } from 'react-redux';

import { getCardsSorting, setCardsCurrentPageAC } from 'features/Cards/bll/cardsActions';
import { getCardsTC } from 'features/Cards/bll/cardsThunks';
import {
  getPackSorting,
  setPacksCurrentPageAC,
} from 'features/Packs/bll/CardPacksActions';
import { getCardPacksTC } from 'features/Packs/bll/CardPacksThunk';

export const Sorting: FC<PropsType> = ({ sortName, token }) => {
  const dispatch = useDispatch();

  const setSortUp = (): void => {
    dispatch(setPacksCurrentPageAC(1));
    dispatch(setCardsCurrentPageAC(1));
    if (token) {
      dispatch(getCardsSorting(`0${sortName}`));
      dispatch(getCardsTC({ cardsPack_id: token }));
    } else {
      // dispatch(getPackSorting(`0${sortName}`));
      dispatch(
        getCardPacksTC({
          sortPacks: `0${sortName}`,
        }),
      );
    }
  };
  const setSortDown = (): void => {
    dispatch(setCardsCurrentPageAC(1));
    dispatch(setPacksCurrentPageAC(1));
    if (token) {
      dispatch(getCardsSorting(`1${sortName}`));
      dispatch(getCardsTC({ cardsPack_id: token }));
    } else {
      // dispatch(getPackSorting(`1${sortName}`));
      dispatch(
        getCardPacksTC({
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
