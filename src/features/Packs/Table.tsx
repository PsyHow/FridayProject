import { ChangeEvent, ReactElement, useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  createCardPackTC,
  deleteCardPackTC,
  getCardPacksTC,
  updateCardPackTC,
} from './bll/CardPacksThunk';
import { CardPack } from './CardPack/CardPack';
import style from './Table.module.scss';

import { Button } from 'components/common/Button';
import { DoubleRange } from 'components/common/DoubleRange';
import { Paginator } from 'components/common/Paginator';
import { Search } from 'components/common/Search';
import { Sorting } from 'components/common/Sorting';
import { Preloader } from 'components/Preloader';
import { PATH } from 'enums';
import { setMode, setPacksCurrentPageAC, setPacksPageCount } from 'features/Packs/bll';
import { useCardCountChange } from 'hooks/useCardCountChange';
import { useSearch } from 'hooks/useSearch';
import { selectIsFetching, selectIsLoggedIn } from 'selectors/authSelectors';
import {
  selectCardMaxValue,
  selectCardMinValue,
  selectCardPacks,
  selectCardPackTotalCount,
  selectPackPage,
  selectPackPageCount,
} from 'selectors/cardPacksSelectors';
import { selectCurrentUserId } from 'selectors/profileSelectors';

export const Table = (): ReactElement => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = useSelector(selectCurrentUserId);
  const cardPacksTotalCount = useSelector(selectCardPackTotalCount);
  const cardPacks = useSelector(selectCardPacks);
  const page = useSelector(selectPackPage);
  const pageCount = useSelector(selectPackPageCount);
  const min = useSelector(selectCardMinValue);
  const max = useSelector(selectCardMaxValue);
  const isFetching = useSelector(selectIsFetching);

  const navigate = useNavigate();
  const { debouncingValue, handleChangeSearch, search } = useSearch();
  const { debounceMaxCount, debounceMinCount, maxCount, minCount, onChangeHandler } =
    useCardCountChange();

  useEffect(() => {
    dispatch(setMode('ALL'));
    dispatch(setPacksCurrentPageAC(1));
    dispatch(setPacksPageCount(5));
    dispatch(
      getCardPacksTC({
        min: debounceMinCount,
        max: debounceMaxCount,
        packName: debouncingValue,
        page,
        pageCount,
      }),
    );
  }, [debouncingValue, debounceMinCount, debounceMaxCount]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(PATH.LOGIN);
    }
  }, [isLoggedIn]);

  const deleteCardPack = useCallback(
    (id: string): void => {
      dispatch(deleteCardPackTC(id));
    },
    [dispatch],
  );

  const editCardPack = useCallback(
    (id: string, name: string): void => {
      dispatch(updateCardPackTC(id, name));
    },
    [dispatch],
  );

  const createCardPack = (): void => {
    dispatch(createCardPackTC());
  };

  const changePacks = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setPacksCurrentPageAC(1));
    dispatch(setPacksPageCount(5));
    if (e.currentTarget.checked) {
      dispatch(setMode('OWNER'));
      dispatch(getCardPacksTC({ user_id: userId, page: 1, pageCount: 5 }));
    } else {
      dispatch(setMode('ALL'));
      dispatch(getCardPacksTC({ page: 1, pageCount: 5 }));
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
          <>
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

            <Paginator
              userId={userId}
              page={page}
              pageCount={pageCount}
              totalItemsCount={cardPacksTotalCount}
            />
          </>
        )}
      </div>

      {/* {error && <span className={style.error}>{error}</span>} */}
    </div>
  );
};
