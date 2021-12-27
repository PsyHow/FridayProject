import {
    setCurrentPageAC, setPageCount,
    setTotalItemsCount,
} from "bll/paginatorReducer/paginatorActions";
import { initialState } from "bll/paginatorReducer/paginatorReducer";

export type PaginatorActionTypes =
    | ReturnType<typeof setTotalItemsCount>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setPageCount>

export type InitialStateType = typeof initialState