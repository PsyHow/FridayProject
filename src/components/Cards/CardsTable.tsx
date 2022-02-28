import { ReactElement, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import style from './style/cardsTable.module.scss';

import { deleteCard, fetchCards, updateCard } from 'bll/middlewares';
import { CardsType } from 'bll/types';
import { Card } from 'components/Cards/Card';
import { Paginator } from 'components/common/Paginator';
import { Search } from 'components/common/Search';
import { Sorting } from 'components/common/Sorting';
import { Preloader } from 'components/Preloader';
import { useSearch } from 'hooks/useSearch';
import { selectIsFetching } from 'selectors/authSelectors';
import { selectCardPacks } from 'selectors/cardPacksSelectors';
import {
  selectCards,
  selectCardsCurrentPage,
  selectCardsPageCount,
  selectCardsTotalCount,
} from 'selectors/cardsReducer';

export const CardsTable = (): ReactElement => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const { debouncingValue, search, handleChangeSearch } = useSearch();

  const cards = useSelector(selectCards);
  const cardsTotalCount = useSelector(selectCardsTotalCount);
  const pageCount = useSelector(selectCardsPageCount);
  const page = useSelector(selectCardsCurrentPage);
  const cardPacks = useSelector(selectCardPacks);
  const isFetching = useSelector(selectIsFetching);

  useEffect(() => {
    if (token) {
      dispatch(
        fetchCards({ cardsPack_id: token, cardQuestion: debouncingValue, pageCount: 5 }),
      );
    }
  }, [token, debouncingValue]);

  const cardPackName = cardPacks.filter(pack => pack._id === token)[0];

  const handleDeleteClick = (id: string): void => {
    if (token) dispatch(deleteCard(token, id));
  };

  // const createCard = (): void => {
  //   if (token) dispatch(createCardTC(token));
  // };

  const handleUpdateClick = (id: string, question: string, answer: string): void => {
    if (token) dispatch(updateCard(token, question, answer, id));
  };
  return (
    <div className={style.cardsContainer}>
      <span className={style.title}>
        {(cardPackName && cardPackName.name) || 'Card Name'}
      </span>
      <Search search={search} handleChangeSearch={handleChangeSearch} />
      <table className={style.table}>
        <thead>
          <tr>
            <td>Question</td>
            <td>Answer</td>
            <td>
              Last Updated
              <Sorting token={token} sortName="grade" />
            </td>
            <td>
              Grade
              <Sorting token={token} sortName="created" />
            </td>
          </tr>
        </thead>
        {isFetching ? (
          <Preloader />
        ) : (
          <tbody>
            {cards.map((card: CardsType) => (
              <Card
                key={card._id}
                card={card}
                deleteCard={handleDeleteClick}
                getUpdateCard={handleUpdateClick}
              />
            ))}
          </tbody>
        )}
      </table>
      <div className={style.pagination}>
        <Paginator page={page} pageCount={pageCount} totalItemsCount={cardsTotalCount} />
      </div>

      {/* {error && <span className={style.error}>{error}</span>} */}
    </div>
  );
};
