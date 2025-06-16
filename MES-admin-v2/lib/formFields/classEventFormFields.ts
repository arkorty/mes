'use client'

import { getInstructors } from 'app/api/instructors';
import { ClassFormFieldConfig } from 'types/class-event.types';

export const classFormFields: ClassFormFieldConfig[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    getValue: (props: any) => props.class?.title || '',
    required: true
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    getValue: (props: any) => props.class?.description || '',
    required: true
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
      const { data } = await getInstructors({});
      return data;
    },
    getOptionLabel: (instructor: any) => instructor.name,
    getOptionValue: (instructor: any) => instructor._id,
    required: true
  },
  {
    name: 'level',
    label: 'Level',
    type: 'select',
    getValue: (props: any) => props.class?.level || '',
    options: [
      { label: 'Beginner', value: 'Beginner' },
      { label: 'Intermediate', value: 'Intermediate' },
      { label: 'Advanced', value: 'Advanced' }
    ],
    required: true
  },
  {
    name: 'duration',
    label: 'Duration',
    type: 'text',
    getValue: (props: any) => props.class?.duration || '',
    required: true
  },
  {
    name: 'location',
    label: 'Location',
    type: 'text',
    getValue: (props: any) => props.class?.location || '',
    required: true
  },
  {
    name: 'dates',
    label: 'Dates',
    type: 'array',
    getValue: (props: any) => props.class?.dates || [],
    required: true
  },
  {
    name: 'price',
    label: 'Price',
    type: 'number',
    getValue: (props: any) => props.class?.price || '',
    required: true
  },
  {
    name: 'capacity',
    label: 'Capacity',
    type: 'number',
    getValue: (props: any) => props.class?.capacity || '',
    required: true
  },
  {
    name: 'spotsLeft',
    label: 'Spots Left',
    type: 'number',
    getValue: (props: any) => props.class?.spotsLeft || '',
    required: true
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
