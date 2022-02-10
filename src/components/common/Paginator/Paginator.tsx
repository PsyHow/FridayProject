/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Button from '../Button/Button';
import { SuperSelect } from '../Select/SuperSelect';

import style from './Paginator.module.css';

import {
  setCardsCurrentPageAC,
  setCardsError,
  setCardsPageCount,
} from 'features/Cards/bll/cardsActions';
import { getCardsTC } from 'features/Cards/bll/cardsThunks';
import {
  setPacksCurrentPageAC,
  setPacksPageCount,
} from 'features/Packs/bll/CardPacksActions';
import { getCardPacksTC } from 'features/Packs/bll/CardPacksThunk';

export const Paginator: FC<PropsType> = ({ page, pageCount, totalItemsCount }) => {
  const dispatch = useDispatch();
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
    dispatch(setCardsCurrentPageAC(pageC));
    dispatch(setPacksCurrentPageAC(pageC));
    dispatch(setCardsError(''));
    if (token) {
      dispatch(getCardsTC(token));
    } else dispatch(getCardPacksTC());
  };

  const onChangeSelect = (items: 3 | 5 | 10): void => {
    setValue(items);
    dispatch(setCardsPageCount(items));
    dispatch(setPacksPageCount(items));
    if (token) {
      dispatch(getCardsTC(token));
    } else dispatch(getCardPacksTC());
  };

  return (
    <div className={style.paginator}>
      {portionNumber > 1 && (
        <Button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          Left
        </Button>
      )}
      <SuperSelect options={pageItems} value={value} onChangeOption={onChangeSelect} />
      {pages
        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map(m => (
          // eslint-disable-next-line react/jsx-key
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          // eslint-disable-next-line react/jsx-key
          <span
            className={page === m ? style.selectedPage : style.pageNumber}
            onClick={() => {
              onPageChanged(m);
            }}
          >
            {m}
          </span>
        ))}
      {portionCount > portionNumber && (
        <Button
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          Right
        </Button>
      )}
    </div>
  );
};

type PropsType = {
  page: number;
  pageCount: number;
  totalItemsCount: number;
};
