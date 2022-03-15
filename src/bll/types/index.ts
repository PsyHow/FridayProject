export type CardsType = {
  cardsPack_id: string;
  grade: number;
  question: string;
  shots: number;
  user_id: string;
  updated: string;
  __v: number;
  _id: string;
  type: string;
  answer: string;
  created: string;
  rating: number;
};

export type UserType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;
  created: Date | null;
  updated: Date | null;
  isAdmin: boolean;
  verified: boolean;
  rememberMe: boolean;
  error?: string;
};

export type CardPackType = {
  cardsCount: number;
  created: string;
  grade: number;
  more_id: string;
  name: string;
  path: string;
  private: false;
  rating: number;
  shots: number;
  type: string;
  updated: string;
  user_id: string;
  user_name: string;
  __v: number;
  _id: string;
};

export type ModeType = 'ALL' | 'OWNER' | 'PROFILE';
