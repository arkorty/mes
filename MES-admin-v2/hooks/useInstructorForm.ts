'use client';

import { isFormEmpty, isFormUnchanged, setNestedValue } from '@/lib/utils';
import { createInstructor, editInstructor } from 'app/api/instructors';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { InstructorFieldTypes } from 'types/instructor.types';

const useInstructorForm = (
  mode: 'edit' | 'create',
  initialData?: InstructorFieldTypes
) => {
  const [formData, setFormData] = useState<InstructorFieldTypes>(
    initialData ?? ({} as InstructorFieldTypes)
  );

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData, setFormData]);

  const handleChange = (field: string, value: any) => {
    const allowedTypes = ['image/webp', 'image/jpeg', 'image/jpg', 'image/png'];
    const maxFileSizeMB = 2;

    if (field === 'image') {
      const file = value instanceof FileList ? value[0] : value;
      if (!file) return;

      if (!allowedTypes.includes(file.type)) {
        alert(
          'Only .webp, .jpg, .jpeg, .png files are allowed for cover image'
        );
        return;
      }

      if (file.size > maxFileSizeMB * 1024 * 1024) {
        alert('Cover image must be less than 2MB');
        return;
      }

      setFormData((prev: any) => {
        const updated = { ...prev };
        setNestedValue(updated, field, file);
        return updated;
      });

      return;
    }
    setFormData((prev: any) => {
      const updated = { ...prev };
      setNestedValue(updated, field, value);
      return updated;
    });
  };

  const handleAddInstructor = async () => {
    try {
      const data = await createInstructor(formData);
      if (data) alert('Instructor added successfully!');
      else alert('Could not add instructor, try again.');
    } catch (error) {
      console.error('Error adding instructor:', error);
    } finally {
      setFormData({} as InstructorFieldTypes);
    }
  };

  const handleUpdateInstructor = async (id: any) => {
    try {
      const data = await editInstructor(id, formData);
      if (data) alert('Instructor updated successfully!');
      else alert('Could not update instructor, try again.');
    } catch (error) {
      console.error('Error updating instructor:', error);
    }
  };

  const requiredFields = ['name', 'mobile', 'email'];

  const isEmpty = isFormEmpty(formData, requiredFields);
  const isUnchanged = useMemo(
    () => isFormUnchanged(formData, initialData, mode),
    [formData, initialData, mode]
  );

  const isSubmitDisabled = mode === 'create' ? isEmpty : isUnchanged;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (mode === 'edit') handleUpdateInstructor(initialData?._id);
    else handleAddInstructor();
  };

  return {
    formData,
    setInitialFormData: setFormData,
    handleChange,
    isSubmitDisabled,
    handleSubmit
  };
};

export default useInstructorForm;
