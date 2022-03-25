import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, AllEffect, ForkEffect } from 'redux-saga/effects';
import thunk, { ThunkAction } from 'redux-thunk';

import { cardPacksWatcher } from './middlewares/CardPacks';

import {
  appReducer,
  profileReducer,
  authReducer,
  cardsReducer,
  cardPacksReducer,
  registrationReducer,
} from 'bll/reducers';
import {
  CardPacksActionsType,
  ProfileReducerActionsType,
  AppReducerActions,
  ActionCardTypes,
  RegistrationTypes,
  AuthReducerTypes,
} from 'bll/reducers/types';

const reducers = combineReducers({
  profileReducer,
  cardsReducer,
  registrationReducer,
  cardPacksReducer,
  authReducer,
  appReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducers, applyMiddleware(sagaMiddleware, thunk));

function* rootWatcher(): Generator<
  AllEffect<Generator<ForkEffect<never>, void, unknown>>
> {
  yield all([cardPacksWatcher()]);
}

sagaMiddleware.run(rootWatcher);

export type AppRootStoreType = ReturnType<typeof reducers>;

export type AppActionsType =
  | CardPacksActionsType
  | ActionCardTypes
  | RegistrationTypes
  | AuthReducerTypes
  | ProfileReducerActionsType
  | AppReducerActions;

export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStoreType,
  unknown,
  AppActionsType
>;
