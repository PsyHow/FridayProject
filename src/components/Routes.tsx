import { ReactElement } from 'react';

import { Route, Routes } from 'react-router-dom';

import {
  NewPassword,
  CardsTable,
  LearnPage,
  Login,
  Profile,
  Restore,
  SendEmail,
  SignUp,
  PackList,
  Error,
} from 'components';
import { PATH } from 'enums';

export const Routing = (): ReactElement => (
  <Routes>
    <Route path={PATH.LOGIN} element={<Login />} />
    <Route path={PATH.PROFILE} element={<Profile />} />
    <Route path={PATH.SIGN_UP} element={<SignUp />} />
    <Route path={PATH.PASSWORD_RESTORE} element={<Restore />} />
    <Route path={PATH.SEND_EMAIL} element={<SendEmail />} />
    <Route path={PATH.NEW_PASSWORD} element={<NewPassword />} />
    <Route path={PATH.CARD_PACKS} element={<PackList />} />
    <Route path={PATH.CARD} element={<CardsTable />} />
    <Route path={PATH.LEARN} element={<LearnPage />} />
    <Route path="*" element={<Error />} />
  </Routes>
);
