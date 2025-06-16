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
  addUser: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/add`,
  editUser: (id: any) => `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${id}`,

  getEnquiries: () => `${process.env.NEXT_PUBLIC_API_BASE_URL}/enquiry/`,
  deleteEnquiry: (id: any) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/enquiry/${id}`,

  getClasses: ({ page = 1, limit = 8, search = '' }) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/class?page=${page}&limit=${limit}&search=${search}`,
  getClassById: (id: any) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/class/${id}`,
  createClass: `${process.env.NEXT_PUBLIC_API_BASE_URL}/class/`,
  editClass: (id: any) => `${process.env.NEXT_PUBLIC_API_BASE_URL}/class/${id}`,
  deleteClass: (id: any) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/class/${id}`,

  getInstructors: ({ page = 1, limit = 8, search = '' }) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/instructor?page=${page}&limit=${limit}&search=${search}`,
  getInstructorById: (id: any) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/instructor/${id}`,
  createInstructor: `${process.env.NEXT_PUBLIC_API_BASE_URL}/instructor/`,
  editInstructor: (id: any) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/instructor/${id}`,
  deleteInstructor: (id: any) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/instructor/${id}`,

  adminLogin: `/user/admin/login`
};
