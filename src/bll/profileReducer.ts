const initialState = {
  user: {} as UserType,
};

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

export const setUser = (userData: UserType) => ({ type: 'SET_USER', userData } as const);

// TYPES
export type UserType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;
  created: Date | null;
  updated: Date | null;
  isAdmin: boolean;
  verified: boolean;
  rememberMe: boolean;
  error?: string;
};

type InitialStateType = typeof initialState;

type randomProfileActionsActionType = ReturnType<typeof setUser>;
export type ProfileReducerActionsType = randomProfileActionsActionType;
