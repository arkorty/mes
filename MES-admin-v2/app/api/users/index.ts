'use server';

import api from '@/lib/axios';
import { API_ROUTES } from 'constants/api.routes';
import { revalidatePath } from 'next/cache';
import { UserFields } from 'types/user.types';

export const getUsers = async ({
  page,
  limit,
  search
}: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  try {
    const { data } = await api.get(API_ROUTES.users({ page, limit, search }));
    return data;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw new Error(JSON.stringify(error, null, 2));
  }
};

export const getUserById = async (id: any) => {
  try {
    const { data } = await api.get(API_ROUTES.getUserById(id));
    return data;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw new Error(JSON.stringify(error, null, 2));
  }
};

export const deleteUser = async (id: any) => {
  try {
    const { data } = await api.delete(API_ROUTES.deleteUser(id));
    if (data.success) {
      console.log('deleted successfully');
      revalidatePath('/users');
    }
    return data;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw new Error(JSON.stringify(error, null, 2));
  }
};

export const addUser = async (user: UserFields) => {
  try {
    const { data } = await api.post(API_ROUTES.addUser, user);
    if (data.success) revalidatePath('/users');
    return data;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw new Error(JSON.stringify(error, null, 2));
  }
}

export const updateUser = async (id: any, user: UserFields) => {
  try {
    const { data } = await api.patch(API_ROUTES.editUser(id), user);
    return data;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw new Error(JSON.stringify(error, null, 2));
  }
}