import { Routes } from '@angular/router';
import { Home } from './features/pages/home/home';
import { Login } from './features/pages/login/login';
import { Register } from './features/pages/register/register';
import { PageNotFound } from './features/pages/page-not-found/page-not-found';
import { Component } from '@angular/core';
import { CategoryList } from './features/pages/categories/category-list/category-list';
import { CategoryNewForm } from './features/pages/categories/category-new-form/category-new-form';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '404', component: PageNotFound },
  { path: "categories", component: CategoryList },
  { path: "dashboard/categories/new", component: CategoryNewForm },
  { path: 'dashboard/categories/:id/edit', component: CategoryNewForm },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];
