import { ProfileReducerActionsType } from './types';

import { UserType } from 'bll/types';

const initialState = {
  user: {} as UserType,
};

type InitialStateType = typeof initialState;

export const profileReducer = (
  state = initialState,
  action: ProfileReducerActionsType,
): InitialStateType => {
  switch (action.type) {
    case 'SET_USER': {
      return { ...state, user: { ...action.userData } };
    }
    default: {
      return state;
    }
  }
};
