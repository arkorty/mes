import { ClassFormFieldConfig } from 'types/class-event.types';

export const classFormFields: ClassFormFieldConfig[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    getValue: (props: any) => props.class?.title || ''
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    getValue: (props: any) => props.class?.description || ''
  },
  {
    name: 'shortDescription',
    label: 'Short Description',
    type: 'text',
    getValue: (props: any) => props.class?.shortDescription || ''
  },
  {
    name: 'instructor',
    label: 'Instructor',
    type: 'select',
    isAsync: true,
    getValue: (props: any) => props.class?.instructor || '',
    fetchOptions: async () => {
      const res = await fetch('/api/instructors');
      const data = await res.json();
      return data; // expects [{ id, name }]
    },
    getOptionLabel: (instructor: any) => instructor.name,
    getOptionValue: (instructor: any) => instructor.id
  },
  {
    name: 'level',
    label: 'Level',
    type: 'select',
    getValue: (props: any) => props.class?.level || '',
    options: [
      { label: 'Beginner', value: 'beginner' },
      { label: 'Intermediate', value: 'intermediate' },
      { label: 'Advanced', value: 'advanced' }
    ]
  },
  {
    name: 'duration',
    label: 'Duration',
    type: 'text',
    getValue: (props: any) => props.class?.duration || ''
  },
  {
    name: 'location',
    label: 'Location',
    type: 'text',
    getValue: (props: any) => props.class?.location || ''
  },
  {
    name: 'dates',
    label: 'Dates',
    type: 'array',
    getValue: (props: any) => props.class?.dates || []
  },
  {
    name: 'price',
    label: 'Price',
    type: 'number',
    getValue: (props: any) => props.class?.price || ''
  },
  {
    name: 'capacity',
    label: 'Capacity',
    type: 'number',
    getValue: (props: any) => props.class?.capacity || ''
  },
  {
    name: 'spotsLeft',
    label: 'Spots Left',
    type: 'number',
    getValue: (props: any) => props.class?.spotsLeft || ''
  },
  {
    name: 'skillsCovered',
    label: 'Skills Covered',
    type: 'array',
    getValue: (props: any) => props.class?.skillsCovered || []
  },
  {
    name: 'details.whatToBring',
    label: 'What to Bring',
    type: 'array',
    getValue: (props: any) => props.class?.details?.whatToBring || []
  },
  {
    name: 'details.whatWeProvide',
    label: 'What We Provide',
    type: 'array',
    getValue: (props: any) => props.class?.details?.whatWeProvide || []
  },
  {
    name: 'image',
    label: 'Image',
    type: 'file',
    getValue: (props: any) => props.class?.image || ''
  },
  {
    name: 'tags',
    label: 'Tags',
    type: 'array',
    getValue: (props: any) => props.class?.tags || []
  },
  {
    name: 'contactEmail',
    label: 'Contact Email',
    type: 'text',
    getValue: (props: any) => props.class?.contactEmail || ''
  }
];
