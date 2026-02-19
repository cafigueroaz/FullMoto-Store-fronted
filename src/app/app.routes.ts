import { Routes } from '@angular/router';
import { Home } from './features/pages/home/home';
import { Login } from './features/pages/login/login';
import { Register } from './features/pages/register/register';
import { PageNotFound } from './features/pages/page-not-found/page-not-found';
import { ProductEditForm } from './features/pages/products/product-edit-form/product-edit-form';
import { ProductList } from './features/pages/products/product-list/product-list';
import { ProductNewForm } from './features/pages/products/product-new-form/product-new-form';
import { Card } from '../../src/app/shared/layout/card/card';
import { Navbar } from './shared/layout/navbar/navbar';
import { CategoryList } from './features/pages/categories/category-list/category-list';
import { CategoryNewForm } from './features/pages/categories/category-new-form/category-new-form';
import { Dashboard } from './features/pages/dashboard/dashboard';
import { AuthGuard } from './core/guards/auth-guard';
import { publicGuardGuard } from './core/guards/public-guard-guard';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'login', component: Login , canActivate: [publicGuardGuard] },
  { path: 'register', component: Register, canActivate: [publicGuardGuard] },
  { path: 'nbcategories', component: Navbar },
  { path: '404', component: PageNotFound },

  { path: 'dashboard', component: Dashboard , canActivate: [AuthGuard] },


  {
    path: 'dashboard/products',
    component: ProductList,
    canActivate: [AuthGuard, roleGuard],
    data: { roles: ['admin', "staff"] }
  },
  {
    path: 'dashboard/products/new',
    component: ProductNewForm,
    canActivate: [AuthGuard, roleGuard],
    data: { roles: ['admin', "staff"] }
  },

  { path: 'dashboard/products/edit',
    component: ProductEditForm,
    canActivate: [AuthGuard, roleGuard],
    data: { roles: ['admin', "staff"] }
  },

  { path: 'dashboard/products/card', component: Card, canActivate: [AuthGuard, roleGuard], data: { roles: ['admin', "staff"] } },

  { path: 'dashboard/categories',
    component: CategoryList,
    canActivate: [AuthGuard, roleGuard],
    data: { roles: ['admin', "staff"] }
  },

  { path: 'dashboard/categories/new',
    component: CategoryNewForm,
    canActivate: [AuthGuard, roleGuard],
    data: { roles: ['admin', "staff"] } },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];
