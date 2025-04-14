import api from '@/lib/axios';
import { API_ROUTES } from 'constants/api.routes';
import { revalidatePath } from 'next/cache';

export const getProducts = async ({
  page,
  limit,
  search
}: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  try {
    const { data } = await api.get(
      API_ROUTES.products({ page, limit, search })
    );
    return data;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw new Error(JSON.stringify(error, null, 2));
  }
};

export const getProductById = async (id: any) => {
  try {
    const { data } = await api.get(API_ROUTES.getProductById(id));
    return data;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw new Error(JSON.stringify(error, null, 2));
  }
};

export const deleteProduct = async (id: any) => {
  try {
    const { data } = await api.delete(API_ROUTES.deleteProduct(id));
    if (data.success) {
      console.log('deleted successfully');
      revalidatePath('/products');
    }
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw new Error(JSON.stringify(error, null, 2));
  }
};

export const addUpdateProduct = async (formData: FormData) => {
  try {
    const { data } = await api.post(API_ROUTES.addUpdateProduct, formData);
    return data;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw new Error(JSON.stringify(error, null, 2));
  }
};

export const getProductDropdown = async () => {
  try {
    const { data } = await api.get(API_ROUTES.productDropdown);
    return data;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw new Error(JSON.stringify(error, null, 2));
  }
};
