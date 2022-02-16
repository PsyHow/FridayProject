import { FC, useEffect } from 'react';

import './App.css';
import { useDispatch, useSelector } from 'react-redux';

import { Header } from 'components/common/Header/Header';
import { Routing } from 'components/Routes';
import { authMe } from 'features/authorization/dal/authReducer/authThunks';
import { selectIsLoggedIn } from 'selectors/authSelectors';

export const App: FC = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

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
