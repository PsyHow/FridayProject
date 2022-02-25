export const setNewPassword = (isNewPassword: boolean) =>
  ({
    type: 'REGISTRATION_SET_NEW_PASSWORD',
    payload: { isNewPassword },
  } as const);

export const sendEmail = (isSendEmail: boolean) =>
  ({
    type: 'REGISTRATION_SEND_EMAIL',
    payload: { isSendEmail },
  } as const);

export const confirmRegistrationData = (isConfirmRegData: boolean) =>
  ({
    type: 'REGISTRATION_CONFIRM_REG_DATA',
    payload: { isConfirmRegData },
  } as const);
