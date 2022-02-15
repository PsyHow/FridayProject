import { CardPackType } from '../bll/CardPacksTypes';

export type CardsPackResponseType = {
  cardPacks: CardPackType[];
  cardPacksTotalCount: number;
  maxCardsCount: number;
  minCardsCount: number;
  page: number;
  pageCount: number;
};

export type DataCards = {
  pageCount: number;
  page: number;
  sortPacks: string;
  packName: string;
  min: number;
  max: number;
  user_id: string;
};
