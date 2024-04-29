import { Role } from './roles.type';

export interface User {
  username: string;
  role: Role;
}

export interface UserWithToken extends User {
  token: string;
}

export interface LoginUser {
  id: number;
  numEmpleado: number;
  token: string;
  username:string;
  password:string;
  role:Role;
}

