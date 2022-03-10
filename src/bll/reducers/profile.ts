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
    case 'UPDATE_PROFILE_DATA': {
      return {
        ...state,
        user: { ...state.user, name: action.data.name, avatar: action.data.avatar },
      };
    }
    default: {
      return state;
    }
  }
};
