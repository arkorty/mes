import {
  Album,
  Award,
  ChartColumnStacked,
  MessageCircleQuestion,
  Package,
  ShoppingCart,
  Users2
} from 'lucide-react';

export const URL_ROUTES: any = {
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
  userEdit: (id: string) => `/users/${id}`,
  enquiries: '/enquiries',
  classesAdd: '/classes/add',
  classesEdit: (id: string) => `/classes/${id}`,
  classes: '/classes',
  eventsAdd: '/events/add',
  eventsEdit: (id: string) => `/events/${id}`,
  events: '/events'
};

export const NAV_ROUTES: any = [
  { url: URL_ROUTES.users, label: 'Users', icon: Users2 },
  { url: URL_ROUTES.orders, label: 'Orders', icon: Package },
  {
    url: URL_ROUTES.products,
    label: 'Products',
    icon: ShoppingCart
  },
  {
    url: URL_ROUTES.categories,
    label: 'Categories',
    icon: ChartColumnStacked
  },
  { url: URL_ROUTES.classes, label: 'Classes', icon: Album },
  { url: URL_ROUTES.events, label: 'Events', icon: Award },
  {
    url: URL_ROUTES.enquiries,
    label: 'Enquiries',
    icon: MessageCircleQuestion
  }
];
