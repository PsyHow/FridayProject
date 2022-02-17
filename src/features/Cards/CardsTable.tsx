import { ChangeEvent, FC, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce/lib';

import { createCardTC, deleteCardTC, getCardsTC, updateCardTC } from './bll/cardsThunks';
import { Card } from './Card/Card';
import style from './CardsTable.module.scss';

import { AppRootStoreType } from 'bll/Store';
import { Paginator } from 'components/common/Paginator/Paginator';
import { Search } from 'components/common/Search/Search';
import { Sorting } from 'components/common/Sorting/Sorting';
import { Preloader } from 'components/Preloader/Preloader';
import { CardsType } from 'features/Cards/bll/cardsTypes';
import { setPacksCurrentPageAC } from 'features/Packs/bll/CardPacksActions';

export const CardsTable: FC = () => {
  const dispatch = useDispatch();
  const { cards, cardsTotalCount, pageCount, page, error } = useSelector(
    (state: AppRootStoreType) => state.cardsReducer,
  );

  const { cardPacks } = useSelector((state: AppRootStoreType) => state.cardPacksReducer);
  const isFetching = useSelector<AppRootStoreType, boolean>(
    state => state.registrationReducer.isFetching,
  );
  const { token } = useParams();
  const [search, setSearch] = useState<string>('');
  const [debouncingValue] = useDebounce(search, 1000);
  const setSearchValueHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.currentTarget.value);
  };

  useEffect(() => {
    if (token) {
      dispatch(getCardsTC({ cardsPack_id: token, cardQuestion: debouncingValue }));
    }
    return () => {
      dispatch(setPacksCurrentPageAC(1));
    };
  }, [dispatch, token, debouncingValue]);

  const deleteCard = (id: string): void => {
    if (token) dispatch(deleteCardTC(token, id));
  };

  const cardPackName = cardPacks.filter(pack => pack._id === token)[0];

  const createCard = (): void => {
    if (token) dispatch(createCardTC(token));
  };

  const updateCard = (id: string, question: string, answer: string): void => {
    if (token) dispatch(updateCardTC(token, question, answer, id));
  };
  return (
    <div className={style.cardsContainer}>
      <span className={style.title}>
        {(cardPackName && cardPackName.name) || 'Card Name'}
      </span>
      <Search id={token} />
      {/* <input
        type="search"
        placeholder="Search"
        value={search}
        onChange={setSearchValueHandler}
      /> */}
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
                deleteCard={deleteCard}
                getUpdateCard={updateCard}
              />
            ))}
          </tbody>
        )}
      </table>
      <div className={style.pagination}>
        <Paginator page={page} pageCount={pageCount} totalItemsCount={cardsTotalCount} />
      </div>

      {error && <span className={style.error}>{error}</span>}
    </div>
  );
};
