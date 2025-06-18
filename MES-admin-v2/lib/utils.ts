import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getNestedValue(obj: any, accessor: string): any {
  return accessor.split('.').reduce((acc, key) => acc?.[key], obj);
}
export const setNestedValue = (obj: any, path: string, value: any) => {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  const nested = keys.reduce((acc, key) => {
    if (!acc[key]) acc[key] = {};
    return acc[key];
  }, obj);

  nested[lastKey] = value;
};

export function deepEqual(obj1: any, obj2: any): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function isFormEmpty<T extends object>(
  formData: T,
  requiredFields: string[]
): boolean {
  return requiredFields.some((fieldPath) => {
    const value = getNestedValue(formData, fieldPath);
    return (
      value === undefined ||
      value === '' ||
      (Array.isArray(value) && value.length === 0)
    );
  });
}

export function isFormUnchanged<T>(
  currentForm: T,
  initialForm: T | undefined,
  mode: 'edit' | 'create'
): boolean {
  if (mode === 'edit' && initialForm) {
    return deepEqual(currentForm, initialForm);
  }
  return false;
}

export const buildFormData = (
  formData: FormData,
  data: Record<string, any>
) => {
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
    } else if (typeof value === 'object' && value !== null) {
      formData.append(key, JSON.stringify(value));
    } else if (value !== undefined && value !== null) {
      formData.append(key, value.toString());
    }
  });
};
