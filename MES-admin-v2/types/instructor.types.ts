export type InstructorFieldTypes = {
  _id: string;
  name: string;
  bio?: string;
  image?: string | File;
  email: string;
  mobile: string;
  certifications?: string[];
};

export type InstructorFieldPath = keyof InstructorFieldTypes;

export type InstructorFieldType =
  | 'text'
  | 'textarea'
  | 'email'
  | 'file'
  | 'array'
  | 'number';

export type InstructorFormFieldConfig = {
  name: InstructorFieldPath;
  label: string;
  type: InstructorFieldType;
  getValue: (props: { instructor?: InstructorFieldTypes }) => any;
  required?: boolean;
};
