import axios from 'axios';

import {
  AuthResponseType,
  EditProfileData,
  EditProfileResponse,
  LoginData,
  LoginResponseType,
  NewPasswordData,
} from 'dal/api/types';
import { instance } from 'dal/apiConfing';

const from = 'test-front-admin <viktorburnyshev@gmail.com';
const message =
  '\n<div style="background-color: #4e3673; padding: 15px">' +
  "\npassword recovery link: \n<a href='http://localhost:3000/#/set-new-password/$token$'>link</a>\n</div>\n";

export const authAPI = {
  login(data: LoginData) {
    return instance.post<LoginResponseType>(`auth/login`, data);
  },
  me() {
    return instance.post<LoginResponseType>(`auth/me`);
  },
  logout() {
    return instance.delete<AuthResponseType>(`auth/me`);
  },
  forgot(email: string) {
    return axios.post<AuthResponseType>(
      `https://neko-back.herokuapp.com/2.0/auth/forgot/`,
      {
        email,
        from,
        message,
      },
    );
  },
  newPassword(data: NewPasswordData) {
    return instance.post<AuthResponseType>(`auth/set-new-password/`, data);
  },
  signUp(email: string, password: string) {
    return instance.post(`auth/register`, { email, password });
  },
  editProfile(data: EditProfileData) {
    return instance.put<EditProfileResponse>(`auth/me`, data);
  },
};
