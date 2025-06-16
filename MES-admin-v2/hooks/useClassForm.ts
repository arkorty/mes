'use client';
import {
  isFormEmpty,
  isFormUnchanged,
  setNestedValue
} from '@/lib/utils';
import { createClass, editClass } from 'app/api/classes';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { ClassFieldTypes } from 'types/class-event.types';

const useClassForm = (
  mode: 'edit' | 'create',
  initialClass?: ClassFieldTypes
) => {
  const [newClass, setNewClass] = useState<ClassFieldTypes>(
    initialClass ?? ({} as ClassFieldTypes)
  );

  useEffect(() => {
    if (initialClass) {
      setNewClass(initialClass);
    }
  }, [initialClass]);

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

      setNewClass((prev: any) => {
        const updated = { ...prev };
        setNestedValue(updated, field, file);
        return updated;
      });

      return;
    }
    setNewClass((prev: any) => {
      const updated = { ...prev };
      setNestedValue(updated, field, value);
      return updated;
    });
  };

  const handleAddClass = async () => {
    try {
      // const data = await createClass(newClass);
      // if (data) alert('Class added successfully!');
      // else alert('Could not add class, try again.');
      console.log('adding class', newClass);
    } catch (error) {
      console.error('Error adding class:', error);
    } finally {
      setNewClass({} as ClassFieldTypes);
    }
  };

  const handleUpdateClass = async (id: any) => {
    try {
      // const data = await editClass(id, newClass);
      // if (data) alert('Class updated successfully!');
      // else alert('Could not update class, try again.');
      console.log('updating class', newClass);
    } catch (error) {
      console.error('Error updating class:', error);
    }
  };

  const requiredFields = [
    'title',
    'shortDescription',
    'description',
    'image',
    'instructor',
    'level',
    'duration',
    'location',
    'dates',
    'price',
    'capacity',
    'spotsLeft',
    'details.whatWeProvide',
    'details.whatToBring'
  ];

  const isEmpty = isFormEmpty(newClass, requiredFields);

  const isUnchanged = useMemo(
    () => isFormUnchanged(newClass, initialClass, mode),
    [newClass, initialClass, mode]
  );

  const isSubmitDisabled = mode === 'create' ? isEmpty : isUnchanged;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (mode === 'edit') handleUpdateClass(initialClass?._id);
    else handleAddClass();
  };
  return {
    formData: newClass,
    setInitialFormData: setNewClass,
    handleChange,
    isSubmitDisabled,
    handleSubmit
  };
};

export default useClassForm;
