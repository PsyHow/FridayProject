/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { SuperSelect } from '../Select/SuperSelect';

import style from './Paginator.module.scss';

import { setCardsCurrentPageAC } from 'features/Cards/bll/cardsActions';
import { getCardsTC } from 'features/Cards/bll/cardsThunks';
import { setPacksCurrentPageAC } from 'features/Packs/bll/CardPacksActions';
import { getCardPacksTC } from 'features/Packs/bll/CardPacksThunk';
import { selectCurrentUserId } from 'selectors/profileSelectors';

export const Paginator: FC<PropsType> = ({ page, pageCount, totalItemsCount }) => {
  const dispatch = useDispatch();
  const userId = useSelector(selectCurrentUserId);
  const { token } = useParams();

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
    // if (userId) {
    //   dispatch(setPacksCurrentPageAC(pageC));
    //   dispatch(getCardPacksTC({ user_id: userId, page: pageC }));
    // }
    if (userId === '') {
      dispatch(setPacksCurrentPageAC(pageC));
      dispatch(
        getCardPacksTC({
          page: pageC,
        }),
      );
    }
  };

  const onChangeSelect = (items: 3 | 5 | 10): void => {
    setValue(items);
    // dispatch(setCardsPageCount(items));
    // dispatch(setPacksPageCount(items));

    if (token) {
      dispatch(getCardsTC({ cardsPack_id: token, pageCount: items }));
    }
    // if (userId) {
    //   dispatch(getCardPacksTC({ user_id: userId, pageCount: items }));
    // }
    if (userId === '') {
      dispatch(
        getCardPacksTC({
          pageCount: items,
        }),
      );
    }
  };

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
};

type PropsType = {
  page: number;
  pageCount: number;
  totalItemsCount: number;
};
