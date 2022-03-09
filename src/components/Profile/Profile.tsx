import { ReactElement, useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { setMode, setPacksCurrentPage, setPacksPageCount } from 'bll/actions';
import {
  createCardPack,
  deleteCardPack,
  fetchCardPacks,
  logout,
  updateCardPack,
} from 'bll/middlewares';
import { Button } from 'components/common/Button';
import { Input } from 'components/common/Input';
import { Modal } from 'components/common/Modal';
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

  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [newPackName, setNewPackName] = useState<string>('');

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

  const handleTextChange = (value: string): void => {
    setNewPackName(value);
  };

  const handleCreatePackClick = (): void => {
    dispatch(createCardPack(userId, newPackName));
    setActiveModal(!activeModal);
  };

  const handleToggleModalClick = (): void => {
    setActiveModal(!activeModal);
    setNewPackName('');
  };
  const handleDeleteClick = useCallback(
    (id: string): void => {
      dispatch(deleteCardPack(id, userId));
    },
    [userId],
  );

  const handleEditClick = useCallback(
    (id: string, name: string): void => {
      dispatch(updateCardPack(id, name, userId));
    },
    [userId],
  );

  const handleClickLogout = (): void => {
    dispatch(logout());
  };

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

          <NavLink to={PATH.LOGIN} className={style.login} onClick={handleClickLogout}>
            logout
          </NavLink>
        </div>

        <span className={style.description}>Number of cards</span>
      </div>

      <div className={style.rightContent}>
        <span className={style.title}>My packs list</span>

        <div className={style.searchBox}>
          <Search search={search} handleChangeSearch={handleChangeSearch} />

          <Button onClick={handleToggleModalClick}>Add new pack</Button>

          <Modal active={activeModal} setActive={setActiveModal}>
            <h1 className={style.modalTitle}>Add new pack</h1>

            <label>{`${'Name pack'}`}</label>
            <Input value={newPackName} onChangeText={handleTextChange} />

            <div className={style.modalButtons}>
              <Button onClick={handleToggleModalClick}>Cancel</Button>

              <Button id="save" onClick={handleCreatePackClick}>
                Save
              </Button>
            </div>
          </Modal>
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
