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

export const getSorting = (sortPack: any) => ( {
    type: "SORTING",
    sortPack,
} as const )

export const getSearch = (packName: string) => ( {
    type: "SEARCH",
    packName,
} as const )

export const setMinCardsCount = (min: string) => ( {
    type: "SET_MIN_CARDS_COUNT",
    min,
} as const )

export const setMaxCardsCount = (max: string) => ( {
    type: "SET_MAX_CARDS_COUNT",
    max,
} as const )