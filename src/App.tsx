import { ReactElement, useEffect } from 'react';

import './App.css';

import { useDispatch, useSelector } from 'react-redux';

import { initializeApp } from 'bll/appReducer';
import { AppRootStoreType } from 'bll/Store';
import { Header } from 'components/common/Header/Header';
import { Preloader } from 'components/Preloader/Preloader';
import { Routing } from 'components/Routes';

export const App = (): ReactElement => {
  const dispatch = useDispatch();
  const isInitialized = useSelector<AppRootStoreType, boolean>(
    state => state.appReducer.initialized,
  );

  useEffect(() => {
    dispatch(initializeApp());
  }, []);

  if (!isInitialized) {
    return <Preloader />;
  }

  return (
    <div className="App">
      <Header />
      <Routing />
    </div>
  );
};
