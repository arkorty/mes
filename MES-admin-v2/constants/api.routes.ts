export const API_ROUTES = {
  orders: ({ page = 1, limit = 8, search = '' }) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/order?page=${page}&limit=${limit}&search=${search}`,
  getOrderById: (id: any) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/${id}`,

  products: ({ page = 1, limit = 8, search = '' }) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/product?page=${page}&limit=${limit}&search=${search}`,
  addUpdateProduct: `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/upsert`,
  productDropdown: `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/dropdown/list`,
  getProductById: (id: any) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${id}`,
  deleteProduct: (id: any) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${id}`,

  categories: `${process.env.NEXT_PUBLIC_API_BASE_URL}/category`,
  addUpdateCategory: `${process.env.NEXT_PUBLIC_API_BASE_URL}/category/upsert`,
  categoryDropdown: `${process.env.NEXT_PUBLIC_API_BASE_URL}/category/dropdown`,
  getCategoryById: (id: any) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/category/${id}`,
  deleteCategory: (id: any) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/category/${id}`,

  users: ({ page = 1, limit = 8, search = '' }) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/all?page=${page}&limit=${limit}&search=${search}`,
  getUserById: (id: any) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${id}`,
  deleteUser: (id: any) => `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${id}`,

  adminLogin: `/user/admin/login`
};
