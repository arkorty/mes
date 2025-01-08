import { CategoryDetailsComponent } from './category/category-details/category-details.component';
import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
        data: {
          title: 'Login Page'
        }
    },
    {
        path: '',
        component: LayoutComponent,
        children: [ 
            {
            path: 'dashboard',
            loadComponent: () => import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
           },
          {
            path: 'products',
            loadComponent: () => import('./product/product-list/product-list.component').then((m) => m.ProductListComponent),
          },
          {
            path: 'product/:id',
            loadComponent: () => import('./product/product-details/product-details.component').then((m) => m.ProductDetailsComponent),
          },
          {
            path: 'users',
            loadComponent: () => import('./user/user-list/user-list.component').then((m) => m.UserListComponent),
          },
          {
            path: 'user/:id',
            loadComponent: () => import('./user/user-details/user-details.component').then((m) => m.UserDetailsComponent),
          },
          {
            path: 'categories',
            loadComponent: () => import('./category/category-list/category-list.component').then((m) => m.CategoryListComponent),
          },
          {
            path: 'category/:id',
            loadComponent: () => import('./category/category-details/category-details.component').then((m) => m.CategoryDetailsComponent),
          },
    ]
    }
];
