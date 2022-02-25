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
  getPackSearch,
  getPackSorting,
  setCardPacks,
  setMinMaxCardsPackCount,
  setMode,
  setPackId,
  setPacksCurrentPage,
  setPacksPageCount,
  setTotalPacksCount,
} from 'bll/actions';

export type ProfileReducerActionsType = ReturnType<typeof setUser>;

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
  | ReturnType<typeof getPackSearch>
  | ReturnType<typeof setMinMaxCardsPackCount>
  | ReturnType<typeof getPackSorting>
  | ReturnType<typeof setPackId>
  | ReturnType<typeof setPacksPageCount>
  | ReturnType<typeof setPacksCurrentPage>
  | ReturnType<typeof setTotalPacksCount>
  | ReturnType<typeof setMode>;
