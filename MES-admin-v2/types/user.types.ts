export enum UserRole {
  Admin = 0,
  SuperAdmin = 1,
  Client = 2,
  None = -1
}

export type UserFields = {
  name: string;
  email: string;
  password: string;
  mobile: string;
  role: UserRole;
  picture?: string;
  address?: string;
};
