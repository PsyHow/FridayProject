import { ChangeEvent, ReactElement, useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { setError, setPackId, setPacksCurrentPage, setPacksPageCount } from 'bll/actions';
import {
  createCardPackSaga,
  deleteCardPackSaga,
  fetchCardPacks,
  updateCardPackSaga,
} from 'bll/middlewares';
import { editProfileData, logout } from 'bll/middlewares/auth';
import { Button } from 'components/common/Button';
import { Input } from 'components/common/Input';
import { Modal } from 'components/common/Modal';
import { Paginator } from 'components/common/Paginator';
import { Search } from 'components/common/Search';
import style from 'components/Profile/style/profile.module.scss';
import { Table } from 'components/Table';
import { PATH } from 'enums';
import { useSearch } from 'hooks/useSearch';
import { selectError } from 'selectors/appSelectors';
import { selectIsLoggedIn } from 'selectors/authSelectors';
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
  const [editProfileModal, setEditProfileModal] = useState<boolean>(false);
  const [newPackName, setNewPackName] = useState<string>('');
  const [newName, setNewName] = useState<string>('');
  const [newAvatar, setNewAvatar] = useState('');

  const user = useSelector(selectUser);
  const userId = useSelector(selectCurrentUserId);
  const cardPacksTotalCount = useSelector(selectCardPackTotalCount);
  const page = useSelector(selectPackPage);
  const pageCount = useSelector(selectPackPageCount);
  const cardPacks = useSelector(selectCardPacks);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const error = useSelector(selectError);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(PATH.LOGIN);
    }
  }, [isLoggedIn]);

  useEffect(() => {
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

    return () => {
      dispatch(setPackId(''));
    };
  }, [userId, debouncingValue]);

  const handleTextChange = useCallback((value: string): void => {
    setNewPackName(value);
  }, []);

  const handleCreatePackClick = useCallback(() => {
    dispatch(createCardPackSaga(userId, newPackName));
    setActiveModal(!activeModal);
  }, [userId, newPackName]);

  const handleToggleModalClick = useCallback((): void => {
    setActiveModal(!activeModal);
    setNewPackName('');
  }, [activeModal]);

  const handleOpenEditModalClick = (): void => {
    setEditProfileModal(true);
    setNewName('');
    setNewAvatar('');
    dispatch(setError(''));
  };

  const handleDeleteClick = useCallback(
    (id: string): void => {
      dispatch(deleteCardPackSaga(id, userId));
    },
    [userId],
  );

  const handleEditClick = useCallback(
    (id: string, name: string): void => {
      dispatch(updateCardPackSaga(id, name, userId));
    },
    [userId],
  );

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setNewName(event.currentTarget.value);
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewAvatar(e.currentTarget.value.trim());
  };

  const handlePostAvatarClick = (): void => {
    if (newAvatar && /\.(gif|jpg|jpeg|webp|png)$/i.test(newAvatar)) {
      dispatch(editProfileData({ avatar: newAvatar }));
      setNewAvatar('');
    } else {
      dispatch(setError('Invalid url'));
    }
  };

  const handleEditProfileClick = (): void => {
    if (newName) {
      dispatch(editProfileData({ name: newName }));
    }
    setEditProfileModal(false);
  };

  const handleClickLogout = (): void => {
    dispatch(logout());
  };

  return (
    <div className={style.container}>
      <div className={style.leftContent}>
        <div className={style.profileEdit}>
          <img src={user.avatar ? user.avatar : ''} alt="user avatar" />

          <span className={style.userName}>{user.name}</span>

          <span className={style.specialization}>Front-end developer</span>

          <button
            className={style.editButton}
            type="button"
            onClick={handleOpenEditModalClick}
          >
            Edit profile
          </button>

          <NavLink to={PATH.LOGIN} className={style.login} onClick={handleClickLogout}>
            logout
          </NavLink>

          <Modal active={editProfileModal} setActive={setEditProfileModal}>
            <h1>Personal Information</h1>
            <label>{`${'Change Name'}`}</label>
            <input value={newName} onChange={handleNameChange} />

            <label>{`${'Enter img url'}`}</label>
            <input value={newAvatar} onChange={handleAvatarChange} />
            {error ? <span>{error}</span> : <span />}

            <div>
              <Button onClick={handlePostAvatarClick} type="submit">
                Change Avatar
              </Button>
              <Button onClick={handleEditProfileClick} type="submit">
                Edit Profile
              </Button>
            </div>
          </Modal>
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

        <Table
          cardPacks={cardPacks}
          onDeleteClick={handleDeleteClick}
          onEditClick={handleEditClick}
          id={userId}
        />

        <Paginator
          id={userId}
          page={page}
          pageCount={pageCount}
          totalItemsCount={cardPacksTotalCount}
        />
      </div>
    </div>
  );
};
