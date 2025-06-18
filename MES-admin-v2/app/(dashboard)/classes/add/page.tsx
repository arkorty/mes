import ClassFormWrapper from '@/components/form-wrapper';
import { classFormFields } from '@/lib/formFields/classEventFormFields';
import useClassForm from 'hooks/useClassForm';
import React from 'react';

const AddClass = () => {
  return (
    <>
      <ClassFormWrapper
        mode="create"
        title="New Class"
        description="Add a new class"
        fields={classFormFields}
        useFormHook={useClassForm}
      />
    </>
  );
};

export default AddClass;
