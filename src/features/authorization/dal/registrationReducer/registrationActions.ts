export const isFetching = (isFetching: boolean) =>
  ({
    type: 'REGISTRATION_IS_FETCHING',
    payload: { isFetching },
  } as const);

export const setError = (error: null | string) =>
  ({
    type: 'REGISTRATION_ERROR',
    payload: { error },
  } as const);

export const setNewPassword = (setNewPassword: boolean) =>
  ({
    type: 'REGISTRATION_SET_NEW_PASSWORD',
    payload: { setNewPassword },
  } as const);

export const sendEmail = (sendEmail: boolean) =>
  ({
    type: 'REGISTRATION_SEND_EMAIL',
    payload: { sendEmail },
  } as const);

export const confirmRegistrationDataAC = (confirmRegistrationData: boolean) => ({
  type: 'REGISTRATION_CONFIRM_REG_DATA',
  payload: { confirmRegistrationData },
});
