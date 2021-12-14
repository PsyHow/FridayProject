let initialState : InitialStateType = {
    user: {
        _id: "This is my id",
        email: "here is my email",
        name: "What for do i need a name , i have id",
        publicCardPacksCount: 0,
        created: null,

        updated: null,
        isAdmin: false,
        verified: false,
        rememberMe: false,
        error: "no errors",

        avatar: "some link will be here"
    },

}

export const profileReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "SET_USER": {
            return {...state, user : {...action.userData}}
        }
        default: {
            return state
        }
    }
}

export const setUser = (userData: UserType) => ({
    type: "SET_USER",
    userData
} as const)

//TYPES

export type UserType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод

    created: Date | null;
    updated: Date | null;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;

    error?: string;
}
type InitialStateType = {
    user : UserType
}
type randomProfileActionsActionType = ReturnType<typeof setUser>
type ActionType = randomProfileActionsActionType