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

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'nbcategories', component: Navbar },
  { path: '404', component: PageNotFound },

  { path: 'dashboard/products', component: ProductList },
  { path: 'dashboard/products/new', component: ProductNewForm },
  { path: 'dashboard/products/edit', component: ProductEditForm },
  { path: 'dashboard/products/card', component: Card },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];
