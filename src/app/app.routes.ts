import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { PageNotFound } from './features/page-not-found/page-not-found';
import { ProductEditForm } from './features/dashboard/products/product-edit-form/product-edit-form';
import { ProductList } from './features/dashboard/products/product-list/product-list';
import { ProductNewForm } from './features/dashboard/products/product-new-form/product-new-form';

import { CategoryList } from './features/dashboard/categories/category-list/category-list';
import { CategoryNewForm } from './features/dashboard/categories/category-new-form/category-new-form';
import { Dashboard } from './features/dashboard/dashboard';
import { AuthGuard } from './core/guards/auth-guard';
import { publicGuardGuard } from './core/guards/public-guard-guard';
import { roleGuard } from './core/guards/role-guard';
import { CategoryEditForm } from './features/dashboard/categories/category-edit-form/category-edit-form';
import { UsersList } from './features/dashboard/users/users-list/users-list';
import { UsersEditForm } from './features/dashboard/users/users-edit-form/users-edit-form';
import { CatalogPage } from './features/catalog/catalog-page';
import { ProductsDetail } from './features/products/products-detail';
import { CartPage } from './features/cart/cart-page';
import { ProfilePage } from './features/profile/profile-page';
import { CategoryPage } from './features/categories/category-page';
import { Checkout } from './features/checkout/checkout';
import { MyOrders } from './features/checkout/my-orders/my-orders';
import { Confirmation } from './features/checkout/confirmation/confirmation';
import { UserChangePassword } from './features/dashboard/users/user-change-password/user-change-password';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'login', component: Login, canActivate: [publicGuardGuard] },
  { path: 'register', component: Register, canActivate: [publicGuardGuard] },
  { path: '404', component: PageNotFound },
  { path: 'checkout', component: Checkout, canActivate: [AuthGuard] },
  { path: 'confirmation', component: Confirmation, canActivate: [AuthGuard] },
  { path: 'my-orders', component: MyOrders, canActivate: [AuthGuard] },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard],

    children: [
      {
        path: 'productos',
        component: ProductList,
        canActivate: [roleGuard],
        data: { roles: ['admin', 'staff'] },
      },

      {
        path: 'categorias',
        component: CategoryList,
        canActivate: [roleGuard],
        data: { roles: ['admin', 'staff'] },
      },

      {
        path: 'usuarios',
        component: UsersList,
        canActivate: [roleGuard],
        data: { roles: ['admin'] },
      },

      {
        path: 'usuarios/crear',
        component: Register,
        canActivate: [roleGuard],
        data: { roles: ['admin'] },
      },

      {
        path: 'productos/crear',
        component: ProductNewForm,
        canActivate: [roleGuard],
        data: { roles: ['admin', 'staff'] },
      },

      {
        path: 'categorias/crear',
        component: CategoryNewForm,
        canActivate: [roleGuard],
        data: { roles: ['admin', 'staff'] },
      },

      {
        path: 'categorias/editar/:id',
        component: CategoryEditForm,
        canActivate: [roleGuard],
        data: { roles: ['admin', 'staff'] },
      },

      {
        path: 'productos/editar/:id',
        component: ProductEditForm,
        canActivate: [roleGuard],
        data: { roles: ['admin', 'staff'] },
      },
      {
        path: 'usuarios/editar/:id',
        component: UsersEditForm,
        canActivate: [roleGuard],
        data: { roles: ['admin'] },
      },

      { path: '', redirectTo: 'productos', pathMatch: 'full' },
    ],
  },

  { path: 'catalogo', component: CatalogPage },

  { path: 'cart', component: CartPage, canActivate: [AuthGuard] },

  {
    path: 'profile/:id',
    component: ProfilePage,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: UsersEditForm,
        canActivate: [roleGuard],
      },
      {
        path: 'profile/my-orders',
        component: MyOrders,
        canActivate: [roleGuard],
      },
      {
        path: 'profile/change-password',
        component: UserChangePassword,
        canActivate: [roleGuard],
      }
    ],
  },

  {
    path: 'producto/:id',
    component: ProductsDetail,
  },

  {
    path: 'catalogo/:id',
    component: CategoryPage,
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];
