import {
  InitialStateType,
  RegistrationTypes,
} from 'features/authorization/dal/registrationReducer/registrationTypes';

export const initialState = {
  isFetching: false,
  error: null as null | string,
  setNewPassword: false,
  sendEmail: false,
  confirmRegistrationData: false,
};

export const registrationReducer = (
  state = initialState,
  action: RegistrationTypes,
): InitialStateType => {
  switch (action.type) {
    case 'REGISTRATION_IS_FETCHING':
    case 'REGISTRATION_ERROR':
    case 'REGISTRATION_SET_NEW_PASSWORD':
    case 'REGISTRATION_SEND_EMAIL':
    case 'REGISTRATION_CONFIRM_REG_DATA':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
