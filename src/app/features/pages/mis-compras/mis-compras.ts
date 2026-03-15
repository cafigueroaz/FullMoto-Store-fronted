import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../../core/services/pagos.services';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-mis-compras',
  imports: [CommonModule, RouterLink],
  templateUrl: './mis-compras.html',
  styleUrl: './mis-compras.css',
})
export class MisCompras {
 orders: any[] = [];
  isLoading = true;

  constructor(private orderService: OrderService, private cdr: ChangeDetectorRef) {}

 ngOnInit() {
    this.orderService.getMyOrders().subscribe({
      next: (data: any) => {
        this.orders = Array.isArray(data) ? data : [data];
        this.isLoading = false;
        this.cdr.detectChanges(); // ← fuerza actualización de la vista
      },
      error: (err) => {
        console.error('error:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
