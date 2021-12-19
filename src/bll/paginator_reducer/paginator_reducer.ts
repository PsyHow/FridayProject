const initialState = {
    totalItemsCount: 1000,
}

export const pageReducer = (state = initialState, action: PaginatorActionType): InitialStateType => {
    switch (action.type) {
        case "PAGINATOR/SET_TOTAL_ITEMS_COUNT":
            return { ...state, totalItemsCount: action.totalItemsCount }
        default:
            return state
    }
}

//action
export const setTotalItemsCount = (totalItemsCount: number) => ( {
    type: "PAGINATOR/SET_TOTAL_ITEMS_COUNT",
    totalItemsCount,
} as const )

//types
type InitialStateType = typeof initialState;

type PaginatorActionType = ReturnType<typeof setTotalItemsCount>
