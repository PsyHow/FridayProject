import {
    setCurrentPageAC,
    setPageCount,
    setTotalItemsCount,
} from "components/common/Paginator/paginatorActions";

export type PaginatorActionTypes =
    | ReturnType<typeof setTotalItemsCount>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setPageCount>

