export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
  isActivate: boolean;
  activationCode: string;
  createAt: Date;
  updateAt: Date;
}

export interface RequestLogin {
  username: string;
  password: string;
}

export interface ResponseRegister {
  name: Partial<User>;
  email: string;
  password: string;
  username: string;
}
