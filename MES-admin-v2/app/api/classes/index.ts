'use server';

import api from '@/lib/axios';
import { API_ROUTES } from 'constants/api.routes';

export const getClasses = async ({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}) => {
  try {
    const { data } = await api.get(
      API_ROUTES.getClasses({ page, limit })
    );
    return data;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw new Error(JSON.stringify(error, null, 2));
  }
};

export const getClassById = async (id: any) => {
  try {
    const { data } = await api.get(API_ROUTES.getClassById(id));
    return data;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw new Error(JSON.stringify(error, null, 2));
  }
};

export const createClass = async (formData: any) => {
  try {
    const { data } = await api.post(API_ROUTES.createClass, formData);
    return data;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw new Error(JSON.stringify(error, null, 2));
  }
};

export const editClass = async (id: any, formData: any) => {
  try {
    const { data } = await api.put(API_ROUTES.editClass(id), formData);
    return data;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw new Error(JSON.stringify(error, null, 2));
  }
};

export const deleteClass = async (id: any) => {
  try {
    const { data } = await api.delete(API_ROUTES.deleteClass(id));
    return data;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw new Error(JSON.stringify(error, null, 2));
  }
};
