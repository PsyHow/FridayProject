import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';

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

export const store = createStore(reducers, applyMiddleware(thunk));

export type AppRootStoreType = ReturnType<typeof reducers>;

type AppActionsType =
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
