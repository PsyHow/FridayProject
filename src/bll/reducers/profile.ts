import { ProfileReducerActionsType } from './types';

import { UserType } from 'bll/types';

const initialState: UserType = {
  _id: '',
  email: '',
  name: '',
  avatar: '',
  publicCardPacksCount: 0,
  isAdmin: false,
  verified: false,
  rememberMe: false,
  error: '',
  token: '',
  created: null,
  updated: null,
};

export const profileReducer = (
  state = initialState,
  action: ProfileReducerActionsType,
): UserType => {
  switch (action.type) {
    case 'SET_USER': {
      return { ...state, ...action.userData };
    }
    case 'UPDATE_PROFILE_DATA': {
      return {
        ...state,
        name: action.data.name,
        avatar: action.data.avatar,
      };
    }
    default: {
      return state;
    }
  }
};
