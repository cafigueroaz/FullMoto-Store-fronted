import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { HttpProduct } from '../../../../core/services/http-product';
import { Router } from '@angular/router';
import { AsyncPipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [AsyncPipe, CurrencyPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList {
  public products$: Observable<any[]>;
  private refreshTrigger$ = new BehaviorSubject<void>(undefined);

  constructor(
    private httpProducts: HttpProduct,
    private router: Router,
  ) {
    this.products$ = new Observable<any[]>();
  }

  ngOnInit() {
    this.products$ = this.refreshTrigger$.pipe(switchMap(() => this.httpProducts.getAllProducts()));
  }

  onDelete(id: String) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.httpProducts.deleteProduct(id).subscribe({
        next: (data) => {
          console.log('Respuesta del servidor:', data);

          this.refreshTrigger$.next();
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
        },
      });
    }
  }

  onEdit(id: string) {
    this.router.navigate(['/dashboard', 'productos', 'editar', id]);
  }
}
