import { CardPackType } from "./CardPacksTypes";

export const setCardPacks = (cards: Array<CardPackType>) => ( {
    type: "SET-CARD-PACKS",
    cards,
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

export const setPackId = (id:string) => ({
    type: "SET_PACK_ID",
    id
} as const)