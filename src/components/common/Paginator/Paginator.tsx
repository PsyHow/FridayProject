/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC, memo, useCallback, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { SuperSelect } from '../Select/SuperSelect';

import style from './Paginator.module.scss';

import { setCardsCurrentPageAC } from 'features/Cards/bll/cardsActions';
import { getCardsTC } from 'features/Cards/bll/cardsThunks';
import { setPacksCurrentPageAC } from 'features/Packs/bll/CardPacksActions';
import { getCardPacksTC } from 'features/Packs/bll/CardPacksThunk';
import { selectMode } from 'selectors/cardPacksSelectors';
import { selectCurrentUserId } from 'selectors/profileSelectors';

interface Pagination {
  page: number;
  pageCount: number;
  totalItemsCount: number;
}

export const Paginator: FC<Pagination> = memo(({ page, pageCount, totalItemsCount }) => {
  const dispatch = useDispatch();
  const { token } = useParams();

  const userId = useSelector(selectCurrentUserId);
  const mode = useSelector(selectMode);

  const pageItems = [3, 5, 10];

  const [portionNumber, setPortionNumber] = useState<number>(1);
  const [value, setValue] = useState(pageItems[1]);
  const pagesCount = Math.ceil(totalItemsCount / pageCount);
  const pages = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  const portionSize = 5;
  const portionCount = Math.ceil(pagesCount / portionSize);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;
  const onPageChanged = (pageC: number): void => {
    if (token) {
      dispatch(setCardsCurrentPageAC(pageC));
      dispatch(getCardsTC({ cardsPack_id: token, page: pageC }));
    }
    if (!token && mode === 'OWNER') {
      dispatch(setPacksCurrentPageAC(pageC));
      dispatch(getCardPacksTC({ user_id: userId, page: pageC }));
    }
    if (!token && mode === 'ALL') {
      dispatch(setPacksCurrentPageAC(pageC));
      dispatch(
        getCardPacksTC({
          page: pageC,
        }),
      );
    }
  };

  const onChangeSelect = useCallback(
    (items: 3 | 5 | 10): void => {
      if (token) {
        setValue(items);
        dispatch(getCardsTC({ cardsPack_id: token, pageCount: items }));
      }
      if (!token && mode === 'OWNER') {
        setValue(items);
        dispatch(getCardPacksTC({ user_id: userId, pageCount: items }));
      }
      if (!token && mode === 'ALL') {
        setValue(items);
        dispatch(
          getCardPacksTC({
            pageCount: items,
          }),
        );
      }
    },
    [token],
  );

  return (
    <div className={style.paginator}>
      {portionNumber > 1 && (
        <div
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
          className={style.left}
        />
      )}
      {pages
        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map((m, index) => (
          <span
            key={index}
            className={page === m ? style.selectedPage : style.pageNumber}
            onClick={() => {
              onPageChanged(m);
            }}
          >
            {m}
          </span>
        ))}
      {portionCount > portionNumber && (
        <div
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
          className={style.right}
        />
      )}
      <div className={style.pageSettings}>
        <span>Show</span>
        <SuperSelect options={pageItems} value={value} onChangeOption={onChangeSelect} />
        <span>Cards per Page</span>
      </div>
    </div>
  );
});
