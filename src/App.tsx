import { FC, useEffect } from 'react';

import './App.css';
import { useDispatch } from 'react-redux';

import { Navbar } from 'components/common/Navbar/Navbar';
import { Routing } from 'components/Routes';
import { authMe } from 'features/authorization/dal/authReducer/authThunks';

export const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authMe());
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <Routing />
    </div>
  );
};
