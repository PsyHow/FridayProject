import { FC } from 'react';

import { Route, Routes } from 'react-router-dom';

import { Error } from './Error';
import { Profile } from './Profile/Profile';
import { Test } from './Test/Test';

import { NewPasswordContainer } from 'features/authorization/forgot/ui/NewPassword/NewPasswordContainer';
import { PasswordRestoreContainer } from 'features/authorization/forgot/ui/PasswordRestore/PasswordRestoreContainer';
import { LoginContainer } from 'features/authorization/Login/LoginContainer';
import { SignUpContainer } from 'features/authorization/signUp/SignUpContainer';
import { CardsTable } from 'features/Cards/CardsTable';
import { LearnPage } from 'features/Learn/LearnPage';
import { Table } from 'features/Packs/Table';

export const PATH = {
  LOGIN: 'login',
  PROFILE: 'profile',
  SIGN_UP: 'signup',
  PASSWORD_RESTORE: 'restore',
  NEW_PASSWORD: 'set-new-password/:token',
  TEST: 'test',
  CARD_PACKS: 'packs',
  CARD: '/card/:token',
  LEARN: '/learn/:token',
};

export const Routing: FC = () => (
  <Routes>
    <Route path="/" element={<LoginContainer />} />
    <Route path={PATH.PROFILE} element={<Profile />} />
    <Route path={PATH.SIGN_UP} element={<SignUpContainer />} />
    <Route path={PATH.PASSWORD_RESTORE} element={<PasswordRestoreContainer />} />
    <Route path={PATH.NEW_PASSWORD} element={<NewPasswordContainer />} />
    <Route path={PATH.TEST} element={<Test />} />
    <Route path={PATH.LOGIN} element={<LoginContainer />} />
    <Route path={PATH.CARD_PACKS} element={<Table />} />
    <Route path={PATH.CARD} element={<CardsTable />} />
    <Route path={PATH.LEARN} element={<LearnPage />} />
    <Route path="*" element={<Error />} />
  </Routes>
);
