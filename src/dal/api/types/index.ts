import { CardPackType, CardsType, UserType } from 'bll/types';

export type LoginData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type CardPackData = {
  pageCount?: number;
  page?: number;
  sortPacks?: string;
  packName?: string;
  min?: number;
  max?: number;
  user_id?: string;
};

export type CardsData = {
  cardsPack_id?: string;
  sortCards?: string;
  min?: number;
  max?: number;
  pageCount?: number;
  page?: number;
  cardQuestion?: string;
};

export type NewPasswordData = {
  password: string;
  resetPasswordToken: string;
};

export type LoginResponseType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;
  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean;
  rememberMe: boolean;
  error?: string;
};

export type CardsResponseType = {
  cards: CardsType[];
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  page: number;
  pageCount: number;
  packUserId: string;
};

export type CardsPackResponseType = {
  cardPacks: CardPackType[];
  cardPacksTotalCount: number;
  maxCardsCount: number;
  minCardsCount: number;
  page: number;
  pageCount: number;
};

export type AuthResponseType = {
  info: string;
  error: string;
};

export type EditProfileData = {
  name?: string;
  avatar?: string;
};

export type EditProfileResponse = {
  updatedUser: UserType;
  error: string;
};
