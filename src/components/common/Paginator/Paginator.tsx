/* eslint-disable react/no-array-index-key */
import { FC, memo, useCallback, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import style from './style/paginator.module.scss';
import { Pagination } from './types';

import {
  setCardsCurrentPage,
  setCardsPageCount,
  setPacksCurrentPage,
  setPacksPageCount,
} from 'bll/actions';
import { fetchCards, fetchCardPacks } from 'bll/middlewares';
import { SuperSelect } from 'components/common/Select';
import { selectMode } from 'selectors/cardPacksSelectors';

const pageItems = [3, 5, 10];
const portionSize = 5;

export const Paginator: FC<Pagination> = memo(
  ({ page, pageCount, totalItemsCount, id, min, max }) => {
    const dispatch = useDispatch();
    const { token } = useParams();

    const mode = useSelector(selectMode);

    const [portionNumber, setPortionNumber] = useState<number>(1);
    const [value, setValue] = useState(pageItems[1]);

    const pagesCount = Math.ceil(totalItemsCount / pageCount);
    const portionCount = Math.ceil(pagesCount / portionSize);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;
    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }

    const onPageChanged = (pageC: number): void => {
      if (token) {
        dispatch(setCardsCurrentPage(pageC));
        dispatch(fetchCards({ cardsPack_id: token, page: pageC, pageCount, min, max }));
      }
      if (mode === 'OWNER' || mode === 'PROFILE') {
        dispatch(setPacksCurrentPage(pageC));
        dispatch(fetchCardPacks({ user_id: id, page: pageC, pageCount, min, max }));
      } else if (mode === 'ALL') {
        dispatch(setPacksCurrentPage(pageC));
        dispatch(
          fetchCardPacks({
            page: pageC,
            pageCount,
            min,
            max,
          }),
        );
      }
    };

    const onChangeSelect = useCallback(
      (items: 3 | 5 | 10): void => {
        setValue(items);
        if (token) {
          dispatch(setCardsPageCount(items));
          dispatch(fetchCards({ cardsPack_id: token, pageCount: items, page, min, max }));
        }
        if (mode === 'OWNER' || mode === 'PROFILE') {
          dispatch(setPacksPageCount(items));
          dispatch(fetchCardPacks({ user_id: id, pageCount: items, page, min, max }));
        } else if (mode === 'ALL') {
          dispatch(setPacksPageCount(items));
          dispatch(
            fetchCardPacks({
              pageCount: items,
              page,
              min,
              max,
            }),
          );
        }
      },
      [token, mode],
    );

    const handlePrevPortionChange = (): void => {
      setPortionNumber(portionNumber - 1);
    };

    const handleNextPortionChange = (): void => {
      setPortionNumber(portionNumber + 1);
    };

    return (
      <div className={style.paginator}>
        {portionNumber > 1 && (
          <div
            aria-hidden="true"
            onClick={handlePrevPortionChange}
            className={style.left}
          />
        )}

        {pages
          .filter(
            pageItem =>
              pageItem >= leftPortionPageNumber && pageItem <= rightPortionPageNumber,
          )
          .map((pageItem, index) => (
            <span
              key={index}
              aria-hidden="true"
              className={page === pageItem ? style.selectedPage : style.pageNumber}
              onClick={() => {
                onPageChanged(pageItem);
              }}
            >
              {pageItem}
            </span>
          ))}

        {portionCount > portionNumber && (
          <div
            aria-hidden="true"
            onClick={handleNextPortionChange}
            className={style.right}
          />
        )}
        <div className={style.pageSettings}>
          <span>Show</span>

          <SuperSelect
            options={pageItems}
            value={value}
            onChangeOption={onChangeSelect}
          />

          <span>Cards per Page</span>
        </div>
      </div>
    );
  },
);
