import ClassFormWrapper from '@/components/form-wrapper';
import { instructorFormFields } from '@/lib/formFields/instructorFormFields';
import useInstructorForm from 'hooks/useInstructorForm';
import React from 'react';

const AddInstructor = () => {
  return (
    <>
      <ClassFormWrapper
        mode="create"
        title="New Instructor"
        description="Add a new instructor"
        fields={instructorFormFields}
        useFormHook={useInstructorForm}
      />
    </>
  );
};

export default AddInstructor;
