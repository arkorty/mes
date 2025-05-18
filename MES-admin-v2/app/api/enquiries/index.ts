'use server';

import api from '@/lib/axios';
import { API_ROUTES } from 'constants/api.routes';
import { revalidatePath } from 'next/cache';

export const getEnquiries = async () => {
  try {
    const { data } = await api.get(API_ROUTES.getEnquiries());
    return data;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw new Error(JSON.stringify(error, null, 2));
  }
};

export const deleteEnquiry = async (id: any) => {
  try {
    const { data } = await api.delete(API_ROUTES.deleteEnquiry(id));
    if (data.success) {
      console.log('deleted successfully');
      revalidatePath('/enquiries');
    }
    return data;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw new Error(JSON.stringify(error, null, 2));
  }
};
