import { ChangeEvent, FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Button from '../../components/common/Button/Button';
import SuperCheckbox from '../../components/common/Checkbox/Checkbox';
import { setCardsCurrentPageAC, setCardsError } from '../Cards/bll/cardsActions';

import { setPackId } from './bll/CardPacksActions';
import {
  createCardPackTC,
  deleteCardPackTC,
  getCardPacksTC,
  updateCardPackTC,
} from './bll/CardPacksThunk';
import { CardPack } from './CardPack/CardPack';
import s from './Table.module.css';

import { AppRootStoreType } from 'bll/Store';
import { Paginator } from 'components/common/Paginator/Paginator';
import { Search } from 'components/common/Search/Search';
import { Sorting } from 'components/common/Sorting/Sorting';
import { Preloader } from 'components/Preloader/Preloader';

export const Table: FC = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector<AppRootStoreType, boolean>(
    state => state.authReducer.isLogged,
  );
  const userId = useSelector<AppRootStoreType, string>(st => st.profileReducer.user._id);
  const {
    cardPacksTotalCount,
    cardPacks,
    min,
    max,
    page,
    pageCount,
    minCardsCount,
    maxCardsCount,
    error,
  } = useSelector((state: AppRootStoreType) => state.cardPacksReducer);

  const isFetching = useSelector<AppRootStoreType, boolean>(
    state => state.registrationReducer.isFetching,
  );

  useEffect(() => {
    dispatch(setCardsError(''));
    dispatch(getCardPacksTC());
    return () => {
      dispatch(setCardsCurrentPageAC(1));
    };
  }, [dispatch]);

  const deleteCardPack = (id: string): void => {
    dispatch(deleteCardPackTC(id));
  };

  const editCardPack = (id: string, name: string): void => {
    dispatch(updateCardPackTC(id, name));
  };

  const createCardPack = (): void => {
    dispatch(createCardPackTC());
  };

  const changePacks = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.currentTarget.checked) {
      dispatch(setPackId(userId));
      dispatch(getCardPacksTC());
    } else {
      dispatch(setPackId(''));
      dispatch(getCardPacksTC());
    }
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Button style={{ marginRight: '20px' }} onClick={createCardPack}>
        {' '}
        add cardpack
      </Button>
      <SuperCheckbox onChange={changePacks} /> --- My Packs
      <Search min={min} max={max} defaultMin={minCardsCount} defaultMax={maxCardsCount} />
      <table className={s.table}>
        <thead>
          <tr>
            <td>
              Name
              <Sorting sortName="name" />
            </td>
            <td>
              CardsCount
              <Sorting sortName="cardsCount" />
            </td>
            <td>
              Last Updated
              <Sorting sortName="updated" />
            </td>
            <td>
              Created by
              <Sorting sortName="created" />
            </td>
            <td>Actions</td>
          </tr>
        </thead>

        {isFetching ? (
          <Preloader />
        ) : (
          <tbody>
            {cardPacks.map(cardPack => (
              <CardPack
                key={cardPack._id}
                cardPack={cardPack}
                deleteCardPack={deleteCardPack}
                editCardPack={editCardPack}
              />
            ))}
          </tbody>
        )}
      </table>
      {!isFetching && (
        <Paginator
          page={page}
          pageCount={pageCount}
          totalItemsCount={cardPacksTotalCount}
        />
      )}
      {error && <span className={s.error}>{error}</span>}
    </>
  );
};
