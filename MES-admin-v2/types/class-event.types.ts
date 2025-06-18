export type ClassDetailTypes = {
  whatToBring: string[];
  whatWeProvide: string[];
  priceNote?: string;
};

export type ClassFieldTypes = {
  _id: string;
  title: string;
  shortDescription?: string;
  description: string;
  image: string | File;
  instructor: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  location: string;
  dates: string[];
  price: number;
  capacity: number;
  spotsLeft: number;
  skillsCovered: string[];
  details: ClassDetailTypes;
};

export type ClassFieldPath =
  | 'title'
  | 'shortDescription'
  | 'description'
  | 'image'
  | 'instructor'
  | 'level'
  | 'duration'
  | 'location'
  | 'dates'
  | 'price'
  | 'capacity'
  | 'spotsLeft'
  | 'skillsCovered'
  | 'details.whatToBring'
  | 'details.whatWeProvide'
  | 'details.priceNote';

export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'select'
  | 'array'
  | 'file';

export type ClassFormFieldConfig = {
  name: ClassFieldPath;
  label: string;
  type: FieldType;
  getValue: (props: { class?: ClassFieldTypes }) => any;
  isAsync?: boolean;
  fetchOptions?: () => Promise<any[]>;
  getOptionLabel?: (option: any) => string;
  getOptionValue?: (option: any) => string;
  options?: { label: string; value: string }[];
  required?: boolean;
};
