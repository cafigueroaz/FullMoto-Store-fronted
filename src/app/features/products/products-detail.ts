import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HttpProduct } from '../../core/services/http-product';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.services';
import { HttpAuth } from '../../core/services/http-auth';

@Component({
  selector: 'app-products-detail',
  imports: [CurrencyPipe],
  templateUrl: './products-detail.html',
  styleUrl: './products-detail.css',
})
export class ProductsDetail {
  // Subject vacío que actúa como señal de "destrucción"
  // cuando emite, todos los observables con takeUntil se cancelan
  private destroy$ = new Subject<void>();

  public product: any = null;
  public selectedImage: string = ''; // imagen activa en el visor principal
  public quantity: number = 1; // cantidad seleccionada por el usuario

  constructor(
    private activatedRoute: ActivatedRoute, // lee los parámetros de la URL (/producto/:id)
    private httpProduct: HttpProduct,
    private cdr: ChangeDetectorRef, // fuerza a Angular a re-renderizar el DOM manualmente
    private cartService: CartService,
    public httpAuth: HttpAuth,
    private router: Router,
  ) {}

  addToCart() {
    this.httpAuth.checkAuthStatus().subscribe((isAuth) => {
      if (isAuth) {
        this.cartService.addItem(this.product._id, this.quantity, this.product.price);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {
    this.cartService.loadCart(); // carga el carrito cuando entra al detalle

    // paramMap es un Observable que emite cada vez que los parámetros de la URL cambian
    // usando el observable en vez de snapshot permite reaccionar a cambios de ruta
    // sin destruir y recrear el componente
    this.activatedRoute.paramMap
      .pipe(takeUntil(this.destroy$)) // se cancela automáticamente al destruir el componente
      .subscribe((params) => {
        const id = params.get('id'); // extrae el :id de la URL

        if (id) {
          // resetea el estado antes de cargar el nuevo producto
          // evita que se vea brevemente el producto anterior
          this.product = null;
          this.quantity = 1;
          this.selectedImage = '';
          this.loadProduct(id);
        }
      });
  }

  // FLUJO DE CARGA:
  // 1. Se llama con el id de la URL
  // 2. Hace GET al backend → /products/:id
  // 3. Guarda el producto y setea la imagen principal
  // 4. detectChanges() fuerza el re-render porque Angular
  //    a veces no detecta cambios dentro de callbacks asincrónos
  loadProduct(id: string) {
    this.httpProduct
      .getProductById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.product = data;
          this.selectedImage = data.mainImage; // imagen principal por defecto
          this.cdr.detectChanges(); // fuerza actualización del DOM
        },
        error: (err) => {
          console.error('Error al cargar producto:', err);
          this.cdr.detectChanges();
        },
      });
  }

  // Cambia la imagen principal al hacer clic en una miniatura de la galería
  selectImage(image: string) {
    this.selectedImage = image;
  }

  // Aumenta la cantidad — no puede superar el stock disponible
  increaseQty() {
    if (this.quantity < this.product.stock) this.quantity++;
  }

  // Disminuye la cantidad — no puede bajar de 1
  decreaseQty() {
    if (this.quantity > 1) this.quantity--;
  }

  // FLUJO DE DESTRUCCIÓN:
  // 1. destroy$.next() emite un valor
  // 2. takeUntil lo detecta y cancela todas las suscripciones activas
  // 3. destroy$.complete() cierra el Subject definitivamente
  // Esto evita memory leaks cuando el usuario navega a otra página
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

//takeUntil es un operador de RxJS que cancela automáticamente una suscripción cuando otro Observable emite un valor. En este caso, se usa junto con un Subject llamado destroy$ que emite un valor cuando el componente se destruye (ngOnDestroy). Esto asegura que todas las suscripciones a Observables dentro del componente se cancelen automáticamente al salir de la página, evitando memory leaks.
