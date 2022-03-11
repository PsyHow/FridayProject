import { ReactElement, useEffect } from 'react';

import './App.css';

import { LinearProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { initializeApp } from 'bll/middlewares';
import { Header } from 'components';
import { Routing } from 'components/Routes';
import { selectInitialized } from 'selectors/appSelectors';
import { selectIsFetching, selectIsLoggedIn } from 'selectors/authSelectors';

export const App = (): ReactElement => {
  const dispatch = useDispatch();
  const isInitialized = useSelector(selectInitialized);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isFetching = useSelector(selectIsFetching);

  useEffect(() => {
    dispatch(initializeApp());
  }, []);

  if (!isInitialized) {
    return <LinearProgress color="inherit" />;
  }

  return (
    <div className="App">
      {isLoggedIn && <Header />}
      {isFetching ? <LinearProgress color="inherit" /> : <div className="preloader" />}
      <Routing />
    </div>
  );
};
