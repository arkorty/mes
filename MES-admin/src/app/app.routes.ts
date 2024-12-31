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
        //   {
        //     path: 'classes',
        //     loadComponent: () => import('./class/class-list/class-list.component').then((m) => m.ClassListComponent),
        //   },
        //   {
        //     path: 'class/:id',
        //     loadComponent: () => import('./class/class-details/class-details.component').then((m) => m.ClassDetailsComponent),
        //   },
        //   {
        //     path: 'services',
        //     loadComponent: () => import('./service/service-list/service-list.component').then((m) => m.ServiceListComponent),
        //   },
        //   {
        //     path: 'service/:id',
        //     loadComponent: () => import('./service/service-details/service-details.component').then((m) => m.ServiceDetailsComponent),
        //   },
        //   {
        //     path: 'bookings',
        //     loadComponent: () => import('./class-booking/class-booking.component').then((m) => m.ClassBookingComponent),
        //   },
        //   {
        //     path: 'enquiry',
        //     loadComponent: () => import('./user-enquiry/user-enquiry.component').then((m) => m.UserEnquiryComponent),
        //   },
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
    ]
    }
];
