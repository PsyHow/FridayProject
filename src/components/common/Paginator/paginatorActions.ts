export const setTotalItemsCount = (totalItemsCount: number) => ( {
    type: "PAGINATOR/SET_TOTAL_ITEMS_COUNT",
    totalItemsCount,
} as const )

export const setCurrentPageAC = (page: number) => ( {
    type: "PAGINATOR/SET_CURRENT_PAGE",
    page,
} as const )

export const setPageCount = (pageCount: number) => ( {
    type: "PAGINATOR/SET_PAGE_COUNT",
    pageCount,
} as const )