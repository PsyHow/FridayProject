import { FC, useEffect } from 'react';

import './App.css';
import { useDispatch } from 'react-redux';

import { Header } from 'components/common/Header/Header';
import { Routing } from 'components/Routes';
import { authMe } from 'features/authorization/dal/authReducer/authThunks';

export const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authMe());
  }, []);

  return (
    <div>
      <Header />
      <div className="App">
        <Routing />
      </div>
    </div>
  );
};
