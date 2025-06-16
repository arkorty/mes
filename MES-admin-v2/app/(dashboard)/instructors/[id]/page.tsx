import ClassFormWrapper from '@/components/form-wrapper';
import { instructorFormFields } from '@/lib/formFields/instructorFormFields';
import { getInstructorById } from 'app/api/instructors';
import useInstructorForm from 'hooks/useInstructorForm';
import React from 'react';

const EditInstructor = async ({
  params
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data } = await getInstructorById(id);
  const instructorData = data;
  return (
    <>
      <ClassFormWrapper
        mode="edit"
        title="Edit Instructor"
        description="Edit an instructor"
        fields={instructorFormFields}
        initialData={instructorData}
        useFormHook={useInstructorForm}
      />
    </>
  );
};

export default EditInstructor;
