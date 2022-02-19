import { FC } from 'react';

import { Route, Routes } from 'react-router-dom';

import { Error } from './Error';
import { Profile } from './Profile/Profile';

import { NewPasswordContainer } from 'features/authorization/forgot/ui/NewPassword/NewPasswordContainer';
import { Restore } from 'features/authorization/forgot/ui/PasswordRestore/Restore';
import { SendEmail } from 'features/authorization/forgot/ui/SendEmail/SendEmail';
import { Login } from 'features/authorization/Login/Login';
import { SignUpContainer } from 'features/authorization/signUp/SignUpContainer';
import { CardsTable } from 'features/Cards/CardsTable';
import { LearnPage } from 'features/Learn/LearnPage';
import { Table } from 'features/Packs/Table';

export const PATH = {
  LOGIN: '/',
  PROFILE: 'profile',
  SIGN_UP: 'signup',
  PASSWORD_RESTORE: 'restore',
  NEW_PASSWORD: 'set-new-password/:token',
  TEST: 'test',
  CARD_PACKS: 'packs',
  CARD: '/card/:token',
  LEARN: '/learn/:token',
  SEND_EMAIL: '/sendEmail',
};

export const Routing: FC = () => (
  <Routes>
    <Route path={PATH.LOGIN} element={<Login />} />
    <Route path={PATH.PROFILE} element={<Profile />} />
    <Route path={PATH.SIGN_UP} element={<SignUpContainer />} />
    <Route path={PATH.PASSWORD_RESTORE} element={<Restore />} />
    <Route path={PATH.SEND_EMAIL} element={<SendEmail />} />
    <Route path={PATH.NEW_PASSWORD} element={<NewPasswordContainer />} />
    <Route path={PATH.CARD_PACKS} element={<Table />} />
    <Route path={PATH.CARD} element={<CardsTable />} />
    <Route path={PATH.LEARN} element={<LearnPage />} />
    <Route path="*" element={<Error />} />
  </Routes>
);
