import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuItems = signal<IMenuItem[]>([
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'fas fa-home',
      route: 'dashboard'
    },
    {
      id: 'users',
      label: 'User Management',
      icon: 'fa-solid fa-user',
      children: [
        {
          id: 'add-user',
          label: 'Add User',
          icon: '',
          route: 'user/0'
        },
        {
          id: 'view-users',
          label: 'View Users',
          icon: '',
          route: 'users'
        }
      ]
    },
    {
      id: 'products',
      label: 'Product Management',
      icon: 'fa-solid fa-box',
      children: [
        {
          id: 'add-product',
          label: 'Add product',
          icon: '',
          route: 'product/0'
        },
        {
          id: 'view-products',
          label: 'View products',
          icon: '',
          route: 'products'
        }
      ]
    },
    {
      id: 'categories',
      label: 'Category',
      icon: 'fa-solid fa-list',
      children: [
        {
          id: 'add-category',
          label: 'Add category',
          icon: '',
          route: 'category/0'
        },
        {
          id: 'view-categories',
          label: 'View categories',
          icon: '',
          route: 'categories'
        }
      ]
    },
    {
      id: 'orders',
      label: 'Order Management',
      icon: 'fa-solid fa-list',
      children: [
        // {
        //   id: 'add-order',
        //   label: 'Add order',
        //   icon: '',
        //   route: 'category/0'
        // },
        {
          id: 'view-orders',
          label: 'View orders',
          icon: '',
          route: 'orders'
        }
      ]
    },
   
    // Add other menu items following the same pattern
  ]);
  constructor() { }

  getMenuItems() {
    return this.menuItems;
  }

}

export interface IMenuItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  children?: IMenuItem[];
}
