export type AuthResponseType = {
  info: string;
  error: string;
};
export type NewPasswordRequestType = {
  password: string;
  resetPasswordToken: string;
};

export type LoginData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type LoginResponseType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;
  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean;
  rememberMe: boolean;
  error?: string;
};
