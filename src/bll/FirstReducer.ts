const initialState: InitialStateType = {}

export const firstReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case"SOME_ACTION": {
            return state
        }
        default:
            return state
    }
}

export const someAC = () => {
    return { type: "SOME_ACTION", payload: {} } as const
}

type SomeACType = ReturnType<typeof someAC>
type InitialStateType = {}
type ActionType = SomeACType