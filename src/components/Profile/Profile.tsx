import { ChangeEvent, ReactElement, useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setMode, setPacksCurrentPage, setPacksPageCount } from 'bll/actions';
import {
  createCardPack,
  deleteCardPack,
  fetchCardPacks,
  updateCardPack,
} from 'bll/middlewares';
import { editProfileData } from 'bll/middlewares/auth';
import { Button } from 'components/common/Button';
import { Input } from 'components/common/Input';
import { Modal } from 'components/common/Modal';
import { Paginator } from 'components/common/Paginator';
import { Search } from 'components/common/Search';
import style from 'components/Profile/style/profile.module.scss';
import { Table } from 'components/Table';
import { PATH } from 'enums';
import { useSearch } from 'hooks/useSearch';
import { selectIsLoggedIn } from 'selectors/authSelectors';
import {
  selectCardPacks,
  selectCardPackTotalCount,
  selectPackPage,
  selectPackPageCount,
} from 'selectors/cardPacksSelectors';
import {
  selectAvatar,
  selectCurrentUserId,
  selectUser,
} from 'selectors/profileSelectors';

export const Profile = (): ReactElement => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { debouncingValue, handleChangeSearch, search } = useSearch();

  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [editProfileModal, setEditProfileModal] = useState<boolean>(false);
  const [newPackName, setNewPackName] = useState<string>('');
  const [newName, setNewName] = useState<string>('');
  const [newAvatar, setAvatar] = useState<string>('');

  const user = useSelector(selectUser);
  const avatar = useSelector(selectAvatar);
  const userId = useSelector(selectCurrentUserId);
  const cardPacksTotalCount = useSelector(selectCardPackTotalCount);
  const page = useSelector(selectPackPage);
  const pageCount = useSelector(selectPackPageCount);
  const cardPacks = useSelector(selectCardPacks);
  const isLoggedIn = useSelector(selectIsLoggedIn);

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

  const handleOpenEditModalClick = (): void => {
    setEditProfileModal(!editProfileModal);
    setNewName('');
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

  const handleEditNameClick = (): void => {
    dispatch(editProfileData({ name: newName }));
    setEditProfileModal(!editProfileModal);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setNewName(event.currentTarget.value);
  };

  const handleAvatarClick = (): void => {
    if (newAvatar && /\.(gif|jpg|jpeg|webp|png)$/i.test(avatar as string)) {
      dispatch(editProfileData({ avatar: newAvatar }));
      setEditProfileModal(!editProfileModal);
    }
  };
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setAvatar(e.currentTarget.value.trim());
  };

  return (
    <div className={style.container}>
      <div className={style.leftContent}>
        <div className={style.profileEdit}>
          <img src={user.avatar} alt="user avatar" />

          <span className={style.userName}>{user.name}</span>

          <span className={style.specialization}>Front-end developer</span>

          <button
            className={style.editButton}
            type="button"
            onClick={handleOpenEditModalClick}
          >
            Edit profile
          </button>

          <Modal active={editProfileModal} setActive={setEditProfileModal}>
            <h1>Personal Information</h1>

            <input type="text" value={newName} onChange={handleNameChange} />

            <button type="button" onClick={handleEditNameClick}>
              Save
            </button>

            <input type="text" onChange={handleAvatarChange} />
            <button type="button" onClick={handleAvatarClick}>
              OK
            </button>
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
          userId={userId}
          page={page}
          pageCount={pageCount}
          totalItemsCount={cardPacksTotalCount}
        />
      </div>
    </div>
  );
};
