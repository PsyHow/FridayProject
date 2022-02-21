import { AppThunkType } from './Store';

import { Nullabale } from 'const';
import { authMe } from 'features/authorization/dal/authReducer/authThunks';

const initialState = {
  initialized: false,
  error: null as Nullabale<string>,
};

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

type InitialState = typeof initialState;

export const setInitialized = (isInitialized: boolean) =>
  ({
    type: 'APP_SET_INITIALZED',
    payload: { isInitialized },
  } as const);

export const setError = (error: Nullabale<string>) =>
  ({
    type: 'APP_SET_ERROR',
    payload: { error },
  } as const);

export const initializeApp = (): AppThunkType => dispatch => {
  const promise = dispatch(authMe());
  Promise.all([promise]).then(() => {
    dispatch(setInitialized(true));
  });
};

export type AppReducerActions =
  | ReturnType<typeof setInitialized>
  | ReturnType<typeof setError>;
