import { Routes } from '@angular/router';
import { Home } from './features/pages/home/home';
import { Login } from './features/pages/login/login';
import { Register } from './features/pages/register/register';
import { PageNotFound } from './features/pages/page-not-found/page-not-found';
import { ProductEditForm } from './features/pages/products/product-edit-form/product-edit-form';
import { ProductList } from './features/pages/products/product-list/product-list';
import { ProductNewForm } from './features/pages/products/product-new-form/product-new-form';
import { Card } from '../../src/app/shared/layout/card/card';

import { CategoryList } from './features/pages/categories/category-list/category-list';
import { CategoryNewForm } from './features/pages/categories/category-new-form/category-new-form';
import { Dashboard } from './features/pages/dashboard/dashboard';
import { AuthGuard } from './core/guards/auth-guard';
import { publicGuardGuard } from './core/guards/public-guard-guard';
import { roleGuard } from './core/guards/role-guard';
import { CategoryEditForm } from './features/pages/categories/category-edit-form/category-edit-form';
import { UsersList } from './features/pages/users/users-list/users-list';
import { UsersEditForm } from './features/pages/users/users-edit-form/users-edit-form';
import { CatalogPage } from './features/pages/catalog/catalog-page';
import { ProductsDetail } from './features/pages/products/products-detail/products-detail';
import { CartPage } from './features/pages/cart/cart-page';
import { ProfilePage } from './features/pages/profile/profile-page/profile-page';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'login', component: Login, canActivate: [publicGuardGuard] },
  { path: 'register', component: Register, canActivate: [publicGuardGuard] },
  { path: '404', component: PageNotFound },

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

  { path: 'cart', component: CartPage },

  { path: 'profile/:id', component: ProfilePage },

  { path: 'producto/:id', component: ProductsDetail },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];
