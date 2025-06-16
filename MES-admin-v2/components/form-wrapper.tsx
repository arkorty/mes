'use client';

import ClassForm from '@/components/class-form';
import { useEffect } from 'react';

type Props = {
  mode: 'edit' | 'create';
  title: string;
  description: string;
  fields: any;
  initialData?: any;
  useFormHook: (mode: 'edit' | 'create', initialData?: any) => any;
};

export default function ClassFormWrapper({
  mode,
  title,
  description,
  fields,
  initialData,
  useFormHook
}: Props) {
  const {
    formData,
    setInitialFormData,
    handleChange,
    handleSubmit,
    isSubmitDisabled
  } = useFormHook(mode, initialData);

  useEffect(() => {
    if (initialData) setInitialFormData(initialData);
  }, [initialData, setInitialFormData]);

  return (
    <ClassForm
      title={title}
      description={description}
      fields={fields}
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isSubmitDisabled={isSubmitDisabled}
    />
  );
}
