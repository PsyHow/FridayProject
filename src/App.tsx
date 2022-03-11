import { ReactElement, useEffect } from 'react';

import './App.css';

import { useDispatch, useSelector } from 'react-redux';

import { initializeApp } from 'bll/middlewares';
import { Header, Preloader } from 'components';
import { Routing } from 'components/Routes';
import { selectInitialized } from 'selectors/appSelectors';
import { selectIsLoggedIn } from 'selectors/authSelectors';

export const App = (): ReactElement => {
  const dispatch = useDispatch();
  const isInitialized = useSelector(selectInitialized);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(initializeApp());
  }, []);

  if (!isInitialized) {
    return <Preloader />;
  }

  return (
    <div className="App">
      {isLoggedIn && <Header />}
      <Routing />
    </div>
  );
};
