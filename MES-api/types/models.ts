export interface IAddress {
  address?: string;
  state?: string;
  city?: string;
  zipCode?: string;
}

export type TEnquiry = {
  email: string;
  mobile: string;
  message?: string;
};
