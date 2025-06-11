'use client';

import ClassForm from '@/components/class-form';
import useClassForm from 'hooks/useClassForm';
import { useEffect } from 'react';
import { ClassFieldTypes } from 'types/class-event.types';

type Props = {
  mode: 'edit' | 'create';
  title: string;
  description: string;
  fields: any; // or stricter type
  initialData?: ClassFieldTypes;
};

export default function ClassFormWrapper({
  mode,
  title,
  description,
  fields,
  initialData
}: Props) {
  const { newClass, handleChange, handleSubmit, setInitialClass } =
    useClassForm(mode, initialData);

  useEffect(() => {
    if (initialData) setInitialClass(initialData);
  }, [initialData, setInitialClass]);

  return (
    <ClassForm
      title={title}
      description={description}
      fields={fields}
      formData={newClass}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}
