/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEvent, FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/common/Button/Button';

import { setPackId } from './bll/CardPacksActions';
import {
  createCardPackTC,
  deleteCardPackTC,
  getCardPacksTC,
  updateCardPackTC,
} from './bll/CardPacksThunk';
import { CardPack } from './CardPack/CardPack';
import style from './Table.module.scss';

import { setError } from 'bll/appReducer';
import { AppRootStoreType } from 'bll/Store';
import { DoubleRange } from 'components/common/DoubleRange/DoubleRange';
import { Paginator } from 'components/common/Paginator/Paginator';
import { Search } from 'components/common/Search/Search';
import { Sorting } from 'components/common/Sorting/Sorting';
import { Preloader } from 'components/Preloader/Preloader';
import { PATH } from 'components/Routes';
import { useCardCountChange } from 'hooks/useCardCountChange';
import { useSearch } from 'hooks/useSearch';
import { selectIsFetching, selectIsLoggedIn } from 'selectors/authSelectors';

export const Table: FC = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = useSelector<AppRootStoreType, string>(st => st.profileReducer.user._id);
  const { cardPacksTotalCount, cardPacks, min, max, page, pageCount } = useSelector(
    (state: AppRootStoreType) => state.cardPacksReducer,
  );
  const isFetching = useSelector(selectIsFetching);
  const navigate = useNavigate();
  const { debouncingValue, handleChangeSearch, search } = useSearch();
  const { debounceMaxCount, debounceMinCount, maxCount, minCount, onChangeHandler } =
    useCardCountChange();

  useEffect(() => {
    dispatch(setError(''));
    dispatch(
      getCardPacksTC({
        min: debounceMinCount,
        max: debounceMaxCount,
        packName: debouncingValue,
        pageCount: 5,
      }),
    );
  }, [dispatch, debouncingValue, debounceMinCount, debounceMaxCount]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(PATH.LOGIN);
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
          <Search search={search} handleChangeSearch={handleChangeSearch} />
          <Button onClick={createCardPack}>Add new pack</Button>
        </div>
        {isFetching ? (
          <Preloader />
        ) : (
          <table className={style.table}>
            <thead>
              <tr>
                <td>
                  Name
                  {/* <Sorting sortName="name" /> */}
                </td>
                <td>
                  Cards
                  <Sorting sortName="cardsCount" />
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
          </table>
        )}
        <Paginator
          page={page}
          pageCount={pageCount}
          totalItemsCount={cardPacksTotalCount}
        />
      </div>

      {/* {error && <span className={style.error}>{error}</span>} */}
    </div>
  );
};
