import { instance } from "dal/apiConfing/apiConfing";
import axios, { AxiosResponse } from "axios";
import {
    ForgotResponseType,
    NewPasswordRequestType,
    RequestForgotType,
} from "features/authorization/api/authTypes";

const from = "test-front-admin <viktorburnyshev@gmail.com"
const message = "\n<div style=\"background-color: #4e3673; padding: 15px\">" +
    "\npassword recovery link: \n<a href='http://localhost:3000/#/set-new-password/$token$'>link</a>\n</div>\n"

export const authAPI = {
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post(`auth/login`, { email, password, rememberMe })
    },
    me() {
        return instance.post(`auth/me`)
    },
    logout() {
        return instance.delete(`auth/me`)
    },
    forgot(email: string) {
        return axios.post<RequestForgotType, AxiosResponse<ForgotResponseType>>(`https://neko-back.herokuapp.com/2.0/auth/forgot/`, {
            email,
            from,
            message,
        })
    },
    newPassword(data: NewPasswordRequestType) {
        return instance.post(`auth/set-new-password/`, data)
    },
    signUp(email: string, password: string) {
        return instance.post(`auth/register`, { email, password })
    },
}


