import { Component } from '@angular/core';
import { ProductList } from '../products/product-list/product-list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [ProductList, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
