'use client';

import { InstructorFormFieldConfig } from 'types/instructor.types';

export const instructorFormFields: InstructorFormFieldConfig[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    getValue: (props) => props.instructor?.name || '',
    required: true
  },
  {
    name: 'bio',
    label: 'Bio',
    type: 'textarea',
    getValue: (props) => props.instructor?.bio || '',
    required: true
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    getValue: (props) => props.instructor?.email || '',
    required: true
  },
  {
    name: 'mobile',
    label: 'Mobile',
    type: 'text',
    getValue: (props) => props.instructor?.mobile || '',
    required: true
  },
  {
    name: 'certifications',
    label: 'Certifications',
    type: 'array',
    getValue: (props) => props.instructor?.certifications || [],
    required: true
  },
  {
    name: 'image',
    label: 'Image',
    type: 'file',
    getValue: (props) => props.instructor?.image || '',
    required: true
  }
];
