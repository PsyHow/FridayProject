import { AppReducerActions } from './types';

import { Nullabale } from 'const';

const initialState = {
  initialized: false,
  error: null as Nullabale<string>,
};

type InitialState = typeof initialState;

export const appReducer = (
  state = initialState,
  action: AppReducerActions,
): InitialState => {
  switch (action.type) {
    case 'APP_SET_INITIALZED': {
      return { ...state, initialized: action.payload.isInitialized };
    }
    case 'APP_SET_ERROR':
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};
