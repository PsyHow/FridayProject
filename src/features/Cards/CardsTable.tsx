import { FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { deleteCardTC, getCardsTC, updateCardTC } from './bll/cardsThunks';
import { Card } from './Card/Card';
import style from './CardsTable.module.scss';

import { AppRootStoreType } from 'bll/Store';
import { Paginator } from 'components/common/Paginator/Paginator';
import { Search } from 'components/common/Search/Search';
import { Sorting } from 'components/common/Sorting/Sorting';
import { Preloader } from 'components/Preloader/Preloader';
import { CardsType } from 'features/Cards/bll/cardsTypes';
import { setPacksCurrentPageAC } from 'features/Packs/bll/CardPacksActions';
import { useSearch } from 'hooks/useSearch';
import { selectIsFetching } from 'selectors/authSelectors';

export const CardsTable: FC = () => {
  const dispatch = useDispatch();
  const { cards, cardsTotalCount, pageCount, page } = useSelector(
    (state: AppRootStoreType) => state.cardsReducer,
  );

  const { cardPacks } = useSelector((state: AppRootStoreType) => state.cardPacksReducer);
  const isFetching = useSelector(selectIsFetching);
  const { token } = useParams();
  const { debouncingValue, search, handleChangeSearch } = useSearch();

  useEffect(() => {
    if (token) {
      dispatch(
        getCardsTC({ cardsPack_id: token, cardQuestion: debouncingValue, pageCount: 5 }),
      );
    }
    // return () => {
    //   dispatch(setPacksCurrentPageAC(1));
    // };
  }, [token, debouncingValue]);

  const deleteCard = (id: string): void => {
    if (token) dispatch(deleteCardTC(token, id));
  };

  const cardPackName = cardPacks.filter(pack => pack._id === token)[0];

  // const createCard = (): void => {
  //   if (token) dispatch(createCardTC(token));
  // };

  const updateCard = (id: string, question: string, answer: string): void => {
    if (token) dispatch(updateCardTC(token, question, answer, id));
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

      {/* {error && <span className={style.error}>{error}</span>} */}
    </div>
  );
};
