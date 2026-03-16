import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { CartService } from '../../core/services/cart.services'; // ajusta ruta
import { OrderService } from '../../core/services/pay.services'; // ajusta ruta

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  selectedMethod: string = '';
  isLoading = false;
  errorMessage = '';

  constructor(
    public cartService: CartService,
    private orderService: OrderService,
    private router: Router,
  ) {}

  async confirmPayment() {
    if (!this.selectedMethod) return;

    this.isLoading = true;

    try {
      const total = await firstValueFrom(this.cartService.total$);

      const response: any = await firstValueFrom(
        this.orderService.confirmOrder(this.selectedMethod),
      );

      this.cartService.clearCart();

      this.router.navigate(['/confirmation'], {
        state: { orderId: response.order._id, total },
      });
    } catch (error) {
      this.errorMessage = 'Hubo un error al procesar tu pago. Intenta de nuevo.';
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }
}
