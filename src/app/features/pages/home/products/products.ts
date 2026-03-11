import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpProduct } from '../../../../core/services/http-product';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Card } from '../../../../shared/layout/card/card';

@Component({
  selector: 'app-products',
  imports: [RouterLink, AsyncPipe, Card],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  private refreshCategoryTrigger$ = new BehaviorSubject<void>(undefined);
  public products$: Observable<any[]>;

  constructor(private httpProduct: HttpProduct) {
    this.products$ = new Observable<any[]>();
  }

  ngOnInit() {
    this.products$ = this.refreshCategoryTrigger$.pipe(
      switchMap(() => this.httpProduct.getAllProducts()),
    );
  }
}
