import { ReactElement, useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setMode, setPacksCurrentPage, setPacksPageCount } from 'bll/actions';
import { deleteCardPack, fetchCardPacks, updateCardPack } from 'bll/middlewares';
import { Paginator } from 'components/common/Paginator';
import { Search } from 'components/common/Search';
import { Preloader } from 'components/Preloader';
import style from 'components/Profile/style/profile.module.scss';
import { Table } from 'components/Table';
import { avatar } from 'const';
import { PATH } from 'enums';
import { useSearch } from 'hooks/useSearch';
import { selectIsFetching, selectIsLoggedIn } from 'selectors/authSelectors';
import {
  selectCardPacks,
  selectCardPackTotalCount,
  selectPackPage,
  selectPackPageCount,
} from 'selectors/cardPacksSelectors';
import { selectCurrentUserId, selectUser } from 'selectors/profileSelectors';

export const Profile = (): ReactElement => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { debouncingValue, handleChangeSearch, search } = useSearch();

  const user = useSelector(selectUser);
  const userId = useSelector(selectCurrentUserId);
  const cardPacksTotalCount = useSelector(selectCardPackTotalCount);
  const page = useSelector(selectPackPage);
  const pageCount = useSelector(selectPackPageCount);
  const cardPacks = useSelector(selectCardPacks);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isFetching = useSelector(selectIsFetching);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(PATH.LOGIN);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    dispatch(setMode('OWNER'));
    dispatch(setPacksCurrentPage(1));
    dispatch(setPacksPageCount(5));
    dispatch(
      fetchCardPacks({
        user_id: userId,
        packName: debouncingValue,
        pageCount: 5,
        page: 1,
      }),
    );
  }, [userId, debouncingValue]);

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

  return (
    <div className={style.container}>
      <div className={style.leftContent}>
        <div className={style.profileEdit}>
          <img src={user.avatar || avatar} alt="user avatar" />

          <span className={style.userName}>{user.name}</span>

          <span className={style.specialization}>Front-end developer</span>

          <button className={style.editButton} type="button">
            Edit profile
          </button>
        </div>

        <span className={style.description}>Number of cards</span>
      </div>

      <div className={style.rightContent}>
        <span className={style.title}>My packs list</span>

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

        {/* <Modal active={activeModal} setActive={setActiveModal}>
          <div>sdfasdafsdf</div>
        </Modal> */}
      </div>
    </div>
  );
};
