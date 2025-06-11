'use client';
import { setNestedValue } from '@/lib/utils';
import { FormEvent, useEffect, useState } from 'react';
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
    setNewClass((prev: any) => {
      const updated = { ...prev };
      setNestedValue(updated, field, value);
      return updated;
    });
  };

  const handleAddClass = async () => {
    try {
      // const data = await addClass(newClass);
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
      // const data = await updateClass(id, newClass);
      // if (data) alert('Class updated successfully!');
      // else alert('Could not update class, try again.');
      console.log('updating class', newClass);
    } catch (error) {
      console.error('Error updating class:', error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (mode === 'edit') handleUpdateClass(initialClass?._id);
    else handleAddClass();
  };
  return { newClass, setInitialClass: setNewClass, handleChange, handleSubmit };
};

export default useClassForm;
