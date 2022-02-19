import { FC, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Profile.module.css';

import { UserType } from 'bll/profileReducer';
import { AppRootStoreType } from 'bll/Store';
import { PATH } from 'components/Routes';
import { selectIsLoggedIn } from 'selectors/authSelectors';

const avatar =
  'https://habrastorage.org/r/w780/webt/fs/uc/ng/fsucngwjrulpxpcwgrrmehvhhf0.jpeg';

export const Profile: FC = () => {
  const user = useSelector<AppRootStoreType, UserType>(
    state => state.profileReducer.user,
  );
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const style = {
    width: '150px',
    height: '150px',
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(PATH.LOGIN);
    }
  }, [isLoggedIn]);

  return (
    <div className={styles.box}>
      <div>
        <h3>Name</h3>
        <span>{user.name}</span>
      </div>
      Public Pack:
      <span>{user.publicCardPacksCount}</span>
      Email:
      <span>{user.email}</span>
      Created by:
      <span>{user.created}</span>
      <img style={style} src={user.avatar || avatar} alt="user avatar" />
    </div>
  );
};
