export const API_ROUTES = {
  orders: ({ page = 1, limit = 8, search = '' }) =>
    `/order?page=${page}&limit=${limit}&search=${search}`,
  getOrderById: (id: any) => `/order/${id}`,

  products: ({ page = 1, limit = 8, search = '' }) =>
    `/product?page=${page}&limit=${limit}&search=${search}`,
  addUpdateProduct: `/product/upsert`,
  productDropdown: `/product/dropdown/list`,
  getProductById: (id: any) => `/product/${id}`,
  deleteProduct: (id: any) => `/product/${id}`,

  categories: `/category`,
  addUpdateCategory: `/category/upsert`,
  categoryDropdown: `/category/dropdown`,
  getCategoryById: (id: any) => `/category/${id}`,
  deleteCategory: (id: any) => `/category/${id}`,

  users: ({ page = 1, limit = 8, search = '' }) =>
    `/user/all?page=${page}&limit=${limit}&search=${search}`,
  getUserById: (id: any) => `/user/${id}`,
  deleteUser: (id: any) => `/user/${id}`,

  adminLogin: `/user/admin/login`
};
