import { ReactElement, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import style from './Profile.module.scss';

import { Paginator } from 'components/common/Paginator';
import { Search } from 'components/common/Search';
import { avatar } from 'const';
import { PATH } from 'enums';
import { setMode, getCardPacksTC, CardPack } from 'features/Packs';
import { useSearch } from 'hooks/useSearch';
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

  const user = useSelector(selectUser);
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
    dispatch(
      getCardPacksTC({
        user_id: userId,
        packName: debouncingValue,
        pageCount: 5,
      }),
    );
  }, [userId, debouncingValue]);

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
          <tbody>
            {cardPacks.map(cardPack => (
              <CardPack
                key={cardPack._id}
                cardPack={cardPack}
                deleteCardPack={() => {}}
                editCardPack={() => {}}
              />
            ))}
          </tbody>
        </table>

        <Paginator
          page={page}
          pageCount={pageCount}
          totalItemsCount={cardPacksTotalCount}
        />
      </div>
    </div>
  );
};
