import { FC } from 'react';

import { useSelector } from 'react-redux';

import styles from './Profile.module.css';

import { UserType } from 'bll/profileReducer';
import { AppRootStoreType } from 'bll/Store';

const avatar =
  'https://habrastorage.org/r/w780/webt/fs/uc/ng/fsucngwjrulpxpcwgrrmehvhhf0.jpeg';

export const Profile: FC = () => {
  const user = useSelector<AppRootStoreType, UserType>(
    state => state.profileReducer.user,
  );
  const loggedIn = useSelector<AppRootStoreType, boolean>(
    state => state.authReducer.isLogged,
  );

  const style = {
    width: '200px',
    height: '200px',
  };

  // if (!loggedIn) navigate(PATH.LOGIN);

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
