import axios, { AxiosResponse } from "axios";

const instanceDev = axios.create({
    withCredentials: true,
    baseURL: "https://back-from-friday-project.herokuapp.com/2.0/",
})

const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:7542/2.0/",
})

const from = "test-front-admin <ai73a@yandex.by>"

const message = "\n<div style=\"background-color: #520a27; padding: 15px\">\npassword recovery link: \n<a href='http://localhost:3000/#/set-new-password/$token$'>link</a>\n</div>\n"

export const registrationAPI = {
    forgot(email: string) {
        return instanceDev.post<RequestForgotType, AxiosResponse<ForgotResponseType>>(`auth/forgot/`, {
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

//types
type ForgotResponseType = {
    info: string,
    error: string,
}
export type NewPasswordRequestType = {
    password: string,
    resetPasswordToken: string,
}
type RequestForgotType = {
    from: string,
    email: string,
    message: string
}
