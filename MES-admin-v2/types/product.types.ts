export type VariationFields = {
  size: string;
  color: string;
  gender: '' | 'M' | 'F';
  weight: number;
  height: number;
  width: number;
  breadth: number;
  quantity: number;
  price: number;
};

export type ProductFields = {
  name: string;
  slug: string;
  brand: string;
  category: string;
  description: string;
  shortDescription: string;
  price: number;
  salePrice: number;
};
