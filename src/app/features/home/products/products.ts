import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpProduct } from '../../../core/services/http-product';
import { map, Observable } from 'rxjs';
import { Card } from '../../../shared/components/card/card';

@Component({
  selector: 'app-products',
  imports: [RouterLink, AsyncPipe, Card],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  public products$: Observable<any[]>;

  constructor(private httpProduct: HttpProduct) {
    this.products$ = new Observable<any[]>();
  }

  ngOnInit() {
    this.products$ = this.httpProduct
      .getAllProducts()
      .pipe(map((products) => products.sort(() => Math.random() - 0.5).slice(0, 8)));
  }
}
