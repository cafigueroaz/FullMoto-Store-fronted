import { Component } from '@angular/core';
import { ProductList } from '../products/product-list/product-list';

@Component({
  selector: 'app-dashboard',
  imports: [ProductList],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
