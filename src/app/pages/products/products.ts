import { Component } from '@angular/core';
import { switchMap, Observable, BehaviorSubject, } from 'rxjs';
import { HttpProduct } from '../../core/services/http-product';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  public products$: Observable<any[]>;
  private refreshTrigger$ = new BehaviorSubject<void>(undefined);

  constructor(
    private httpProduct: HttpProduct
  ) {
    this.products$ = new Observable<any[]>();
  }

  ngOnInit() {

    this.products$ = this.refreshTrigger$.pipe(
      switchMap(() => this.httpProduct.getAllProducts()),
    );

  }

  refreshProducts(){
    this.refreshTrigger$.next();
  }
}


