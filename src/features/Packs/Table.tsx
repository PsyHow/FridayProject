/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEvent, FC, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce/lib';

import Button from '../../components/common/Button/Button';
import { setCardsError } from '../Cards/bll/cardsActions';

import { setPackId } from './bll/CardPacksActions';
import {
  createCardPackTC,
  deleteCardPackTC,
  getCardPacksTC,
  updateCardPackTC,
} from './bll/CardPacksThunk';
import { CardPack } from './CardPack/CardPack';
import style from './Table.module.scss';

import { AppRootStoreType } from 'bll/Store';
import { DoubleRange } from 'components/common/DoubleRange/DoubleRange';
import { Paginator } from 'components/common/Paginator/Paginator';
import { Sorting } from 'components/common/Sorting/Sorting';
import { Preloader } from 'components/Preloader/Preloader';
import { selectIsLoggedIn } from 'selectors/authSelectors';

export const Table: FC = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
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
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>('');
  const [debouncingValue] = useDebounce(search, 1000);
  const setSearchValueHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.currentTarget.value);
  };

  // double range
  const [minCount, setMinCount] = useState(minCardsCount);
  const [maxCount, setMaxCount] = useState(maxCardsCount);

  const onChangeHandler = (values: number | number[]): void => {
    if (Array.isArray(values)) {
      setMinCount(values[0]);
      setMaxCount(values[1]);
    }
  };
  const [debounceMinCount] = useDebounce(minCount, 2000);
  const [debounceMaxCount] = useDebounce(maxCount, 2000);

  useEffect(() => {
    dispatch(setCardsError(''));
    dispatch(
      getCardPacksTC({
        min: debounceMinCount,
        max: debounceMaxCount,
        packName: debouncingValue,
        page,
        pageCount,
        sortPacks: '',
        user_id: '',
      }),
    );
  }, [dispatch, debouncingValue, debounceMinCount, debounceMaxCount]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('login');
    }
  }, [isLoggedIn]);

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
      dispatch(getCardPacksTC({ user_id: userId }));
    } else {
      dispatch(setPackId(''));
      dispatch(getCardPacksTC());
    }
  };

  return (
    <div className={style.container}>
      <div className={style.leftContent}>
        <span className={style.description}>Show packs cards</span>
        <div className={style.checkBoxInput}>
          <label className={style.toggle}>
            <input onChange={changePacks} type="checkbox" />
            <span className={style.slider} />
            <span className={style.labels} data-on="MY" data-off="ALL" />
          </label>
        </div>
        <span className={style.description}>Number of cards</span>
        <div className={style.Search}>
          <DoubleRange
            min={min}
            max={max}
            value={[minCount, maxCount]}
            onChangeRange={onChangeHandler}
          />
        </div>
      </div>
      <div className={style.rightContent}>
        <span className={style.title}>Packs list</span>
        <div className={style.searchBox}>
          <input
            type="search"
            placeholder="Search"
            value={search}
            onChange={setSearchValueHandler}
          />
          <Button onClick={createCardPack}>Add new pack</Button>
        </div>
        <table className={style.table}>
          <thead>
            <tr>
              <td>
                Name
                {/* <Sorting sortName="name" /> */}
              </td>
              <td>
                Cards
                {/* <Sorting sortName="cardsCount" /> */}
              </td>
              <td>
                Last Updated
                {/* <Sorting sortName="updated" /> */}
              </td>
              <td>
                Created by
                {/* <Sorting sortName="created" /> */}
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
      </div>

      {error && <span className={style.error}>{error}</span>}
    </div>
  );
};
