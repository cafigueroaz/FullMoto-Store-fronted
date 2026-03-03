import { Component } from '@angular/core';
import { ProductList } from '../products/product-list/product-list';
import { RouterLink } from '@angular/router';
import { ProductEditForm } from '../products/product-edit-form/product-edit-form';
import { ProductNewForm } from '../products/product-new-form/product-new-form';

@Component({
  selector: 'app-dashboard',
  imports: [ProductList, RouterLink, ProductNewForm],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  public activeView: string = 'dashboard';

  setView(view: string) {
    this.activeView = view;
  }
}
