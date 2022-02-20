import { AppRootStoreType } from 'bll/Store';
import { CardPackType } from 'features/Packs/bll/CardPacksTypes';

export const selectCardPacks = (
  state: AppRootStoreType,
): {
  cardPacks: CardPackType[];
  cardPacksTotalCount: number;
  maxCardsCount: number;
  minCardsCount: number;
  page: number;
  pageCount: number;
  sortPacks: string;
  packName: string;
  min: number;
  max: number;
  error: string;
  user_id: string;
} => state.cardPacksReducer;
