export const URL_ROUTES = {
  login: '/admin/login',
  orders: '/admin/orders',
  orderView: (id: string) => `/admin/orders/${id}`,
  products: '/admin/products',
  productAdd: '/admin/products/add',
  productEdit: (id: string) => `/admin/products/${id}`,
  categories: '/admin/categories',
  categoryAdd: '/admin/categories/add',
  categoryEdit: (id: string) => `/admin/categories/${id}`,
  users: '/admin/users',
  userAdd: '/admin/users/add',
  userEdit: (id: string) => `/admin/users/${id}`
};
