import { ProductFields, VariationFields } from 'types/product.types';

export const variationFields: VariationFields = {
  size: '',
  color: '',
  gender: '',
  weight: 0,
  height: 0,
  width: 0,
  breadth: 0,
  quantity: 0,
  price: 0
};

export const productFields: ProductFields = {
  name: '',
  slug: '',
  brand: '',
  category: '',
  shortDescription: '',
  description: '',
  price: 0,
  salePrice: 0
};

export const productFieldLabels: Record<keyof ProductFields, string> = {
  name: 'Product Name',
  slug: 'Slug',
  brand: 'Brand',
  category: 'Category',
  shortDescription: 'Short Description',
  description: 'Description',
  price: 'Price',
  salePrice: 'Sale Price'
};

export const variationFieldLabels: Record<keyof VariationFields, string> = {
  size: 'Size',
  color: 'Color',
  gender: 'Gender',
  weight: 'Weight (kg)',
  height: 'Height (cm)',
  width: 'Width (cm)',
  breadth: 'Breadth (cm)',
  quantity: 'Stock Quantity',
  price: 'Price'
};
