import {
    InitialStateType,
    PaginatorActionTypes,
} from "bll/paginatorReducer/paginatorTypes";

export const initialState = {
    page: 1,
    pageCount: 5,
    cardPacksTotalCount: 0,
}


export const paginatorReducer =
    (state = initialState, action: PaginatorActionTypes): InitialStateType => {
        switch (action.type) {
            case "PAGINATOR/SET_PAGE_COUNT":
                return { ...state, pageCount: action.pageCount }
            case "PAGINATOR/SET_CURRENT_PAGE":
                return { ...state, page: action.page }
            case "PAGINATOR/SET_TOTAL_ITEMS_COUNT":
                return { ...state, cardPacksTotalCount: action.totalItemsCount }
            default:
                return state
        }
    }