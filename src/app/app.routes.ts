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

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '404', component: PageNotFound },

  { path: 'dashboard', component: Dashboard },

  { path: 'dashboard/products', component: ProductList },
  { path: 'dashboard/products/new', component: ProductNewForm },
  { path: 'dashboard/products/edit', component: ProductEditForm },
  { path: 'dashboard/products/card', component: Card },

  { path: "dashboard/categories", component: CategoryList },
  { path: "dashboard/categories/new", component: CategoryNewForm },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];
