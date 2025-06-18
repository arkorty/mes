import api from '@/lib/axios';
import { API_ROUTES } from 'constants/api.routes';

export const getInstructors = async ({
  page,
  limit
}: {
  page?: number;
  limit?: number;
}) => {
  try {
    const { data } = await api.get(API_ROUTES.getInstructors({ page, limit }));
    return data;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw new Error(JSON.stringify(error, null, 2));
  }
};

export const getInstructorById = async (id: any) => {
  try {
    const { data } = await api.get(API_ROUTES.getInstructorById(id));
    return data;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw new Error(JSON.stringify(error, null, 2));
  }
};

export const createInstructor = async (formData: FormData) => {
  try {
    const { data } = await api.post(API_ROUTES.createInstructor, formData);
    return data;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw new Error(JSON.stringify(error, null, 2));
  }
};

export const editInstructor = async (id: any, formData: FormData) => {
  try {
    const { data } = await api.put(API_ROUTES.editInstructor(id), formData);
    return data;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw new Error(JSON.stringify(error, null, 2));
  }
};

export const deleteInstructor = async (id: any) => {
  try {
    const { data } = await api.delete(API_ROUTES.deleteInstructor(id));
    return data;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw new Error(JSON.stringify(error, null, 2));
  }
};
