import axios from "axios";

const instanceDev = axios.create({
    withCredentials: true,
    baseURL: "https://back-from-friday-project.herokuapp.com/2.0/",
})

const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:7542/2.0/",
})

const from = "Burnyshev Viktor<viktorburnyshev@gmail.com>"

const message = `<div>password recovery link: <a href='http://localhost:3000/#/newPassword/$token$'>
    link</a> </div>`


export const registrationAPI = {
    forgot(email: string) {
        return instanceDev.post<ForgotResponseType>(`auth/forgot/`, { email, from, message })
    },
    newPassword(data: NewPasswordRequestType) {
        return instance.post(`auth/set-new-password/`, data)
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