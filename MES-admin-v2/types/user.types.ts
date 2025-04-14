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
  picture: string;
  address: string;
};

export const userFields: UserFields = {
  name: '',
  email: '',
  password: '',
  mobile: '',
  role: -1,
  picture: '',
  address: ''
};

export const userFieldLabels: Record<keyof UserFields, string> = {
  name: 'Name',
  email: 'Email',
  password: 'Password',
  mobile: 'Mobile',
  role: 'Role',
  picture: 'Picture',
  address: 'Address'
};
