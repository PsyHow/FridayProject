import { CardPackType } from "./CardPacksTypes";

export const setCardPacks = (cards: Array<CardPackType>) => ( {
    type: "SET-CARD-PACKS",
    cards,
} as const )

export const getPackSorting = (item: any) => ( {
    type: "GET_PACK_SORTING",
    item,
} as const )

export const getPackSearch = (value: string) => ( {
    type: "GET_PACK_SEARCH",
    value,
} as const )

export const setMinMaxCardsPackCount = (min:number, max:number) => ({
    type: "SET_MIN_MAX_CARDS_PACK_COUNT",
    min,
    max
} as const)

export const setPackId = (id:string) => ({
    type: "SET_PACK_ID",
    id
} as const)