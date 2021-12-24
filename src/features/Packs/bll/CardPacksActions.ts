import { CardPackType } from "./CardPacksTypes";

export const setCardPacks = (cards: Array<CardPackType>) => ( {
    type: "SET-CARD-PACKS",
    cards,
} as const )

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

export const getSorting = (item: any) => ( {
    type: "SORTING",
    item,
} as const )

export const getSearch = (value: string) => ( {
    type: "SEARCH",
    value,
} as const )

export const setMinItemsCount = (min: string) => ( {
    type: "SET_MIN_ITEM_COUNT",
    min,
} as const )

export const setMaxItemsCount = (max: string) => ( {
    type: "SET_MAX_ITEM_COUNT",
    max,
} as const )