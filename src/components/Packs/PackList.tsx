import { ChangeEvent, ReactElement, useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import style from './style/packList.module.scss';

import { setPacksPageCount, setPacksCurrentPage, setPackId } from 'bll/actions';
import { deleteCardPackSaga, fetchCardPacksSaga, updateCardPack } from 'bll/middlewares';
import { DoubleRange } from 'components/common/DoubleRange';
import { Paginator } from 'components/common/Paginator';
import { Search } from 'components/common/Search';
import { Table } from 'components/Table';
import { PATH } from 'enums';
import { useCardCountChange } from 'hooks/useCardCountChange';
import { useSearch } from 'hooks/useSearch';
import { selectIsLoggedIn } from 'selectors/authSelectors';
import {
  selectCardMaxValue,
  selectCardMinValue,
  selectCardPacks,
  selectCardPackTotalCount,
  selectPackId,
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
  const packId = useSelector(selectPackId);

  const navigate = useNavigate();

  const { debouncingValue, handleChangeSearch, search } = useSearch();
  const { debounceMaxCount, debounceMinCount, maxCount, minCount, onChangeHandler } =
    useCardCountChange();

  useEffect(() => {
    dispatch(setPacksCurrentPage(1));
    dispatch(setPacksPageCount(5));

    if (packId === userId && packId) {
      dispatch(
        fetchCardPacksSaga({
          user_id: userId,
          min: debounceMinCount,
          max: debounceMaxCount,
          packName: debouncingValue,
          page: 1,
          pageCount,
        }),
      );
    }

    if (packId === '') {
      dispatch(
        fetchCardPacksSaga({
          min: debounceMinCount,
          max: debounceMaxCount,
          packName: debouncingValue,
          page: 1,
          pageCount,
        }),
      );
    }
  }, [packId, debouncingValue, debounceMinCount, debounceMaxCount]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(PATH.LOGIN);
    }
  }, [isLoggedIn]);

  const handleDeleteClick = useCallback(
    (id: string): void => {
      dispatch(deleteCardPackSaga(id, userId));
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
      dispatch(setPackId(userId));
    } else {
      dispatch(setPackId(''));
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

        <Table
          cardPacks={cardPacks}
          onDeleteClick={handleDeleteClick}
          onEditClick={handleEditClick}
        />

        <Paginator
          id={packId}
          page={page}
          pageCount={pageCount}
          totalItemsCount={cardPacksTotalCount}
          min={debounceMinCount}
          max={debounceMaxCount}
        />
      </div>
    </div>
  );
};