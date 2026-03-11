import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.services';

@Component({
  selector: 'app-cart-page',
  imports: [AsyncPipe, CurrencyPipe, RouterLink],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
})
export class CartPage implements OnInit {
  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.loadCart();
  }

  increaseQty(item: any): void {
    this.cartService.updateQuantity(item.productId._id, item.quantity + 1);
  }

  decreaseQty(item: any): void {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.productId._id, item.quantity - 1);
    }
  }

  removeItem(productId: string): void {
    this.cartService.removeItem(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
