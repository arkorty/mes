export const URL_ROUTES = {
  login: '/login',
  orders: '/orders',
  orderView: (id: string) => `/orders/${id}`,
  products: '/products',
  productAdd: '/products/add',
  productEdit: (id: string) => `/products/${id}`,
  categories: '/categories',
  categoryAdd: '/categories/add',
  categoryEdit: (id: string) => `/categories/${id}`,
  users: '/users',
  userAdd: '/users/add',
  userEdit: (id: string) => `/users/${id}`
};
