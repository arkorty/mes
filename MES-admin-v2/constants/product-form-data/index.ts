export const productFormFields = [
  {
    key: 'name',
    label: 'Product Name',
    type: 'text',
    defaultValue: '',
    placeholder: 'Product Name',
    required: true
  },
  {
    key: 'slug',
    label: 'Slug',
    type: 'text',
    defaultValue: '',
    placeholder: 'Slug',
    required: true
  },
  {
    key: 'brand',
    label: 'Brand',
    type: 'text',
    defaultValue: '',
    placeholder: 'Brand',
    required: true
  },
  {
    key: 'sku',
    label: 'SKU',
    type: 'text',
    defaultValue: '',
    placeholder: 'sku',
    required: true
  },
  {
    key: 'categoryId',
    label: 'Category',
    type: 'select',
    defaultValue: '',
    placeholder: 'Category',
    dropDown: [],
    required: true
  },
  {
    key: 'subCategoryId',
    label: 'Sub Category',
    type: 'select',
    defaultValue: '',
    placeholder: 'Sub Category',
    dropDown: [],
  },
  {
    key: 'subSubCategoryId',
    label: 'Sub Sub Category',
    type: 'select',
    defaultValue: '',
    placeholder: 'Sub Sub Category',
    dropDown: [],
  },
  {
    key: 'shortDescription',
    label: 'Short Description',
    type: 'text',
    defaultValue: '',
    placeholder: 'Short Description',
    required: true
  },
  {
    key: 'description',
    label: 'Description',
    type: 'text',
    defaultValue: '',
    placeholder: 'Description',
    required: true
  },
  {
    key: 'price',
    label: 'Price',
    type: 'number',
    defaultValue: 0,
    placeholder: 'Price',
    required: true
  },
  {
    key: 'salePrice',
    label: 'Sale Price',
    type: 'number',
    defaultValue: 0,
    placeholder: 'Sale Price',
    required: true
  },
  {
    key: 'coverImage',
    label: 'Cover Image',
    type: 'file',
    defaultValue: null,
    placeholder: 'Cover Image',
    required: true
  },
  {
    key: 'otherImages',
    label: 'Other Images',
    type: 'file',
    defaultValue: [],
    placeholder: 'Other Images',
    required: true
  }
];

export const variationFormFields = [
  {
    key: 'isBaseVariation',
    label: 'Base Variation',
    type: 'checkbox',
    defaultValue: false,
    placeholder: 'Base Variation',
  },
  {
    key: 'size',
    label: 'Size',
    type: 'text',
    defaultValue: '',
    placeholder: 'Size',
    required: true
  },
  {
    key: 'color',
    label: 'Color',
    type: 'text',
    defaultValue: '',
    placeholder: 'Color',
    required: true
  },
  {
    key: 'gender',
    label: 'Gender',
    type: 'text',
    defaultValue: '',
    placeholder: 'Gender',
    required: true
  },
  {
    key: 'weight',
    label: 'Weight (kg)',
    type: 'number',
    defaultValue: 0,
    placeholder: 'Weight (kg)'
  },
  {
    key: 'height',
    label: 'Height (cm)',
    type: 'number',
    defaultValue: 0,
    placeholder: 'Height (cm)'
  },
  {
    key: 'width',
    label: 'Width (cm)',
    type: 'number',
    defaultValue: 0,
    placeholder: 'Width (cm)'
  },
  {
    key: 'breadth',
    label: 'Breadth (cm)',
    type: 'number',
    defaultValue: 0,
    placeholder: 'Breadth (cm)'
  },
  {
    key: 'quantity',
    label: 'Stock Quantity',
    type: 'number',
    defaultValue: 0,
    placeholder: 'Stock Quantity',
    required: true
  },
  {
    key: 'price',
    label: 'Price',
    type: 'number',
    defaultValue: 0,
    placeholder: 'Price',
    required: true
  },
  {
    key: 'variationImage',
    label: 'Variation Image',
    type: 'file',
    defaultValue: null,
    placeholder: 'Variation Image',
    required: true
  },
];
