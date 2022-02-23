import { AppRootStoreType } from 'bll/Store';

export const selectHasSendMail = (state: AppRootStoreType): boolean =>
  state.registrationReducer.sendEmail;

export const selectSetNewPassword = (state: AppRootStoreType): boolean =>
  state.registrationReducer.setNewPassword;
