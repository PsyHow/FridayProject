import { ReactElement, useEffect } from 'react';

import './App.css';

import { useDispatch, useSelector } from 'react-redux';

import { initializeApp } from 'bll/appReducer';
import { Header } from 'components/Header';
import { Preloader } from 'components/Preloader';
import { Routing } from 'components/Routes';
import { selectInitialized } from 'selectors/appSelectors';

export const App = (): ReactElement => {
  const dispatch = useDispatch();
  const isInitialized = useSelector(selectInitialized);

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
