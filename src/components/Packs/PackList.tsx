import { ChangeEvent, ReactElement, useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import style from './style/packList.module.scss';

import { setMode, setPacksPageCount, setPacksCurrentPage } from 'bll/actions';
import { deleteCardPack, fetchCardPacks, updateCardPack } from 'bll/middlewares';
import { DoubleRange } from 'components/common/DoubleRange';
import { Paginator } from 'components/common/Paginator';
import { Search } from 'components/common/Search';
import { Preloader } from 'components/Preloader';
import { Table } from 'components/Table';
import { PATH } from 'enums';
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

export const PackList = (): ReactElement => {
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
    dispatch(setPacksCurrentPage(1));
    dispatch(setPacksPageCount(5));
    dispatch(
      fetchCardPacks({
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

  const handleDeleteClick = useCallback(
    (id: string): void => {
      dispatch(deleteCardPack(id, userId));
    },
    [dispatch],
  );

  const handleEditClick = useCallback(
    (id: string, name: string): void => {
      dispatch(updateCardPack(id, name, userId));
    },
    [dispatch],
  );

  const changePacks = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setPacksCurrentPage(1));
    dispatch(setPacksPageCount(5));
    if (e.currentTarget.checked) {
      dispatch(setMode('OWNER'));
      dispatch(fetchCardPacks({ user_id: userId, page: 1, pageCount: 5 }));
    } else {
      dispatch(setMode('ALL'));
      dispatch(fetchCardPacks({ page: 1, pageCount: 5 }));
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
        </div>

        {isFetching ? (
          <Preloader />
        ) : (
          <Table
            cardPacks={cardPacks}
            onDeleteClick={handleDeleteClick}
            onEditClick={handleEditClick}
          />
        )}

        <Paginator
          userId={userId}
          page={page}
          pageCount={pageCount}
          totalItemsCount={cardPacksTotalCount}
        />
      </div>
    </div>
  );
};
