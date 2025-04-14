'use server';

import api from '@/lib/axios';
import { API_ROUTES } from 'constants/api.routes';

export const getOrders = async ({
  page,
  limit,
  search
}: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  try {
    const { data } = await api.get(API_ROUTES.orders({ page, limit, search }));
    return data;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw new Error(JSON.stringify(error, null, 2));
  }
};

export const getOrderById = async (id: any) => {
  try {
    const { data } = await api.get(API_ROUTES.getOrderById(id));
    return data;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw new Error(JSON.stringify(error, null, 2));
  }
};
