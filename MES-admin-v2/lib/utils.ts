import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getNestedValue(obj: any, accessor: string): any {
  return accessor.split('.').reduce((acc, key) => acc?.[key], obj);
}
