import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, switchMap, takeUntil } from 'rxjs';

import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpCategory } from '../../../../core/services/http-category';
import { HttpProduct } from '../../../../core/services/http-product';
import { Card } from '../../../../shared/layout/card/card';
import { CartService } from '../../../../core/services/cart.services';

@Component({
  selector: 'app-category-page',
  imports: [Card, RouterLink],
  templateUrl: './category-page.html',
  styleUrl: './category-page.css',
})
export class CategoryPage {
  public category: any = null;
  public products: any[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpCategory: HttpCategory,
    private httpProduct: HttpProduct,
    private cdr: ChangeDetectorRef, 
   
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params) => {
          const id = params.get('id')!;
          return this.httpCategory.getcategoryById(id);
        }),
      )
      .subscribe((category) => {
        this.category = category;
        this.loadProducts(category._id);
      });
  }

  loadProducts(categoryId: string) {
    this.httpProduct
      .getProductsByCategory(categoryId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((products) => {
        this.products = products;
        this.cdr.detectChanges();
      });

    console.log('Productos cargados para la categoría', categoryId, this.products);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

// // ============================================================
// // PATRÓN takeUntil — cancelar suscripciones al destruir el componente
// //
// // Sin esto, las suscripciones siguen vivas en memoria aunque
// // el componente ya no exista (memory leak).
// // destroy$ actúa como interruptor: cuando emite, takeUntil
// // cancela automáticamente todas las suscripciones conectadas.
// // ============================================================

// // 1. Crear el interruptor
// private destroy$ = new Subject<void>();

// // 2. Conectarlo a cada suscripción con pipe(takeUntil(this.destroy$))
// this.http.getSomething()
//   .pipe(takeUntil(this.destroy$))
//   .subscribe(data => { ... });

// // 3. Accionarlo cuando el componente muere
// ngOnDestroy() {
//   this.destroy$.next();     // dispara la emisión → cancela todas las suscripciones
//   this.destroy$.complete(); // cierra el Subject
// }
