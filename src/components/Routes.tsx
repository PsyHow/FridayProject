import { FC } from 'react';

import { Route, Routes } from 'react-router-dom';

import { Error } from './Error';

import { PATH } from 'enums/pathRoutes';
import {
  NewPasswordContainer,
  Restore,
  SendEmail,
  Login,
  SignUp,
} from 'features/authorization';
import { CardsTable } from 'features/Cards';
import { LearnPage } from 'features/Learn';
import { Table } from 'features/Packs';
import { Profile } from 'features/Profile';

export const Routing: FC = () => (
  <Routes>
    <Route path={PATH.LOGIN} element={<Login />} />
    <Route path={PATH.PROFILE} element={<Profile />} />
    <Route path={PATH.SIGN_UP} element={<SignUp />} />
    <Route path={PATH.PASSWORD_RESTORE} element={<Restore />} />
    <Route path={PATH.SEND_EMAIL} element={<SendEmail />} />
    <Route path={PATH.NEW_PASSWORD} element={<NewPasswordContainer />} />
    <Route path={PATH.CARD_PACKS} element={<Table />} />
    <Route path={PATH.CARD} element={<CardsTable />} />
    <Route path={PATH.LEARN} element={<LearnPage />} />
    <Route path="*" element={<Error />} />
  </Routes>
);
