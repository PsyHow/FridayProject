const initialState = {
    totalItemsCount: 1000,
    currentPage: 1,
    pageSize: 14,
}

export const pageReducer =
    (state = initialState, action: ActionType):
        InitialStateType => {
        switch (action.type) {
            case "PAGINATOR/SET_TOTAL_ITEMS_COUNT":
                return { ...state, totalItemsCount: action.totalItemsCount }
            case "PAGINATOR/SET_CURRENT_PAGE":
                return { ...state, currentPage: action.currentPage }
            default:
                return state
        }
    }

//action
export const setTotalItemsCount = (totalItemsCount: number) => ( {
    type: "PAGINATOR/SET_TOTAL_ITEMS_COUNT",
    totalItemsCount,
} as const )

export const setCurrentPageAC = (currentPage: number) => ( {
    type: "PAGINATOR/SET_CURRENT_PAGE",
    currentPage,
} as const )

//types
type InitialStateType = typeof initialState;

type ActionType = ReturnType<typeof setTotalItemsCount>
    | ReturnType<typeof setCurrentPageAC>
