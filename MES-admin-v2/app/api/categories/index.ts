import api from '@/lib/axios';
import { API_ROUTES } from 'constants/api.routes';
import { revalidatePath } from 'next/cache';

export const getCategories = async () => {
  try {
    const { data } = await api.get(API_ROUTES.categories);
    return data;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw new Error(JSON.stringify(error, null, 2));
  }
};

export const addUpdateCategory = async (formData: FormData) => {
  try {
    const { data } = await api.post(API_ROUTES.addUpdateCategory, formData);
    return data;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw new Error(JSON.stringify(error, null, 2));
  }
};

export const getCategoryDropdown = async () => {
  try {
    const { data } = await api.get(API_ROUTES.categoryDropdown);
    return data;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw new Error(JSON.stringify(error, null, 2));
  }
};

export const deleteCategory = async (id: any) => {
  try {
    const { data } = await api.delete(API_ROUTES.deleteCategory(id));
    if (data.success) {
      console.log('deleted successfully');
      revalidatePath('/categories');
    }
    return data;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw new Error(JSON.stringify(error, null, 2));
  }
};

export const getCategoryById = async (id: any) => {
  try {
    const { data } = await api.get(API_ROUTES.getCategoryById(id));
    return data;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw new Error(JSON.stringify(error, null, 2));
  }
};
