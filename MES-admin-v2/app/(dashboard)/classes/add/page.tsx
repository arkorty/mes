import ClassFormWrapper from '@/components/form-wrapper';
import { classFormFields } from '@/lib/formFields/classEventFormFields';
import React from 'react';

const AddClass = () => {
  return (
    <>
      <ClassFormWrapper
        mode="create"
        title="New Class"
        description="Add a new class"
        fields={classFormFields}
      />
    </>
  );
};

export default AddClass;
