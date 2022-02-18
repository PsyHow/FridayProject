import { ReactElement } from 'react';

import './App.css';

import { Header } from 'components/common/Header/Header';
import { Routing } from 'components/Routes';

export const App = (): ReactElement => (
  <div className="App">
    <Header />
    <Routing />
  </div>
);
