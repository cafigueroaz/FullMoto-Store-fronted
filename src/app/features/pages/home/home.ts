import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpProduct } from '../../../core/services/http-product';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  products$: Observable<any[]>;

  constructor(private productService: HttpProduct) {
    this.products$ = this.productService.getAllProducts();
  }
}
