export type ForgotResponseType = {
    info: string,
    error: string,
}
export type NewPasswordRequestType = {
    password: string,
    resetPasswordToken: string,
}
export type RequestForgotType = {
    from: string,
    email: string,
    message: string
}