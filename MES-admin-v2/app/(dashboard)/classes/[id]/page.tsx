import ClassFormWrapper from '@/components/form-wrapper';
import { classFormFields } from '@/lib/formFields/classEventFormFields';
import { getClassById } from 'app/api/classes';
import useClassForm from 'hooks/useClassForm';
import React from 'react';

const EditClass = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data } = await getClassById(id);
  const classData = data;
  return (
    <>
      <ClassFormWrapper
        mode="edit"
        title="Edit Class"
        description="Edit a class"
        fields={classFormFields}
        initialData={classData}
        useFormHook={useClassForm}
      />
    </>
  );
};

export default EditClass;
