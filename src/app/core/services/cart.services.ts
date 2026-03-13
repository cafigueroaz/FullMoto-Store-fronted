import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { HttpCart } from './http-cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems$ = new BehaviorSubject<any[]>([]);

  public items$ = this.cartItems$.asObservable();

  public total$ = this.cartItems$.pipe(
    map((items) => items.reduce((sum, item) => sum + item.price * item.quantity, 0)),
  );

  public itemCount$ = this.cartItems$.pipe(
    map((items) => items.reduce((sum, item) => sum + item.quantity, 0)),
  );

  constructor(private httpCart: HttpCart) {}

  loadCart(): void {
    this.httpCart.getCart().subscribe({
      next: (cart) => this.cartItems$.next(cart?.items ?? []),
      error: () => this.cartItems$.next([]),
    });
  }

  addItem(productId: string, quantity: number, price: number): void {
  this.httpCart.addItem(productId, quantity, price).subscribe({
    next: (res) => {
      if (res?.cart?.items) {
        this.cartItems$.next(res.cart.items);
      }
    },
  });
}

  updateQuantity(productId: string, quantity: number): void {
  this.httpCart.updateQuantity(productId, quantity).subscribe({
    next: (res) => {
      if (res?.cart?.items) {
        this.cartItems$.next(res.cart.items);
      }
    },
  });
}

  removeItem(productId: string): void {
  this.httpCart.removeItem(productId).subscribe({
    next: (res) => {
      if (res?.cart?.items) {
        this.cartItems$.next(res.cart.items);
      }
    },
  });
}

  clearCart(): void {
    this.httpCart.clearCart().subscribe({
      next: () => this.cartItems$.next([]),
    });
  }
}
