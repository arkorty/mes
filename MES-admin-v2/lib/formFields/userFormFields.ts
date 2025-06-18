import { UserFields } from 'types/user.types';

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
