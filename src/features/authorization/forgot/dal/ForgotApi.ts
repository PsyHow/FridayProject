import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://back-from-friday-project.herokuapp.com/2.0/",
})

const from = "Burnyshev Viktor<viktorburnyshev@gmail.com>"

const message = `<div>password recovery link: <a href='http://localhost:3000/#/newPassword/$token$'>
    link</a> </div>`


export const registrationAPI = {
    forgot(email: string) {
        return instance.post<forgotResponseType>(`auth/forgot/`, { email, from, message })
    },
}

//types
type forgotResponseType = {
    info: string,
    error: string,
}