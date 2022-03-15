import {
  setLoggingIn,
  setAuthError,
  setError,
  setFetching,
  setInitialized,
  setUser,
  confirmRegistrationData,
  sendEmail,
  setNewPassword,
  getCards,
  getCardsSorting,
  setCardsCurrentPage,
  setCardsPageCount,
  setTotalCardsCount,
  updateGrade,
  getPackSorting,
  setCardPacks,
  setMode,
  setPacksCurrentPage,
  setPacksPageCount,
  setTotalPacksCount,
} from 'bll/actions';
import { updateProfileData } from 'bll/actions/profile';

export type ProfileReducerActionsType =
  | ReturnType<typeof setUser>
  | ReturnType<typeof updateProfileData>;

export type AppReducerActions =
  | ReturnType<typeof setInitialized>
  | ReturnType<typeof setError>;

export type AuthReducerTypes =
  | ReturnType<typeof setLoggingIn>
  | ReturnType<typeof setFetching>
  | ReturnType<typeof setAuthError>;

export type RegistrationTypes =
  | ReturnType<typeof setNewPassword>
  | ReturnType<typeof sendEmail>
  | ReturnType<typeof confirmRegistrationData>;

export type ActionCardTypes =
  | ReturnType<typeof getCards>
  | ReturnType<typeof getCardsSorting>
  | ReturnType<typeof setCardsCurrentPage>
  | ReturnType<typeof setTotalCardsCount>
  | ReturnType<typeof updateGrade>
  | ReturnType<typeof setCardsPageCount>;

export type CardPacksActionsType =
  | ReturnType<typeof setCardPacks>
  | ReturnType<typeof getPackSorting>
  | ReturnType<typeof setPacksPageCount>
  | ReturnType<typeof setPacksCurrentPage>
  | ReturnType<typeof setTotalPacksCount>
  | ReturnType<typeof setMode>;
