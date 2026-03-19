import { ChangeDetectorRef, Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpCategory } from '../../core/services/http-category';
import { HttpProduct } from '../../core/services/http-product';
import { Card } from '../../shared/components/card/card';

// FilterState define la forma del objeto de filtros
// Cada propiedad representa un filtro independiente
export interface FilterState {
  categories: string[]; // IDs de categorías seleccionadas
  priceRange: 'low' | 'mid' | 'high' | null; // rango de precio seleccionado
  minRating: number | null; // rating mínimo seleccionado
  searchQuery?: string; // término de búsqueda (opcional)
}

// SortState define los criterios de ordenamiento disponibles
// 'field' solo puede ser uno de estos 4 valores — TypeScript lo valida
export interface SortState {
  field: 'featured' | 'price-asc' | 'price-desc' | 'rating';
}

@Component({
  selector: 'app-catalog-page',
  imports: [AsyncPipe, Card],
  templateUrl: './catalog-page.html',
  styleUrl: './catalog-page.css',
})
export class CatalogPage {
  // Subject que emite cuando el componente se destruye
  // lo usan los operadores takeUntil para cancelar suscripciones
  private destroy$ = new Subject<void>();

  private refreshCategoryTrigger$ = new BehaviorSubject<void>(undefined);

  public categories$: Observable<any[]> = new Observable<any[]>();
  public allProducts: any[] = []; // todos los productos sin filtrar
  public filteredProducts: any[] = []; // productos que se muestran en pantalla

  // Estado inicial de los filtros — sin ninguno activo
  public filters: FilterState = {
    categories: [],
    priceRange: null,
    minRating: null,
    searchQuery: '',
  };

  // Estado inicial del sort — 'featured' por defecto
  public sort: SortState = { field: 'featured' };

  constructor(
    private httpCategory: HttpCategory,
    private httpProducts: HttpProduct,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.categories$ = this.refreshCategoryTrigger$.pipe(
      switchMap(() => this.httpCategory.getAllCategories()),
    );
    this.loadProducts();

    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.filters.searchQuery = params['search'] || '';
      this.applyFiltersAndSort();
    });
  }

  loadProducts() {
    this.httpProducts
      .getAllProducts()
      // takeUntil cancela la suscripción cuando destroy$ emite
      // evita memory leaks si el usuario navega antes de que llegue la respuesta
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.allProducts = data;
          this.applyFiltersAndSort(); // aplica filtros y sort iniciales

          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al cargar productos:', err);

          this.cdr.detectChanges();
        },
      });
  }

  // SORT - se ejecuta cuando el usuario cambia el <select>
  onSortChange(event: Event) {
    // castea el target a HTMLSelectElement para acceder a .value
    // castea el string a SortState['field'] para que TypeScript lo valide
    const value = (event.target as HTMLSelectElement).value as SortState['field'];

    // actualiza el estado del sort con el nuevo criterio
    this.sort = { field: value };

    // reaplica — Angular detecta el cambio en filteredProducts y re-renderiza
    this.applyFiltersAndSort();
  }

  // FILTRO CATEGORÍA - agrega o quita el ID del array según el checkbox
  onCategoryChange(event: Event, categoryId: string) {
    const checked = (event.target as HTMLInputElement).checked;
    this.filters.categories = checked
      ? [...this.filters.categories, categoryId] // marcó → agrega
      : this.filters.categories.filter((id) => id !== categoryId); // desmarcó → quita
    this.applyFiltersAndSort();
  }

  // FILTRO PRECIO - actualiza el rango seleccionado
  onPriceChange(range: 'low' | 'mid' | 'high') {
    this.filters.priceRange = range;
    this.applyFiltersAndSort();
  }

  // FILTRO RATING - rating || null convierte 0 en null para limpiar el filtro
  onRatingChange(rating: number) {
    this.filters.minRating = rating || null;
    this.applyFiltersAndSort();
  }

  applyFilters() {
    this.applyFiltersAndSort();
  }

  clearFilters() {
    // resetea el estado a valores iniciales
    this.filters = { categories: [], priceRange: null, minRating: null, searchQuery: '' };
    // desmarca visualmente todos los inputs del DOM
    document
      .querySelectorAll<HTMLInputElement>('input[type="checkbox"], input[type="radio"]')
      .forEach((el) => (el.checked = false));
    this.applyFiltersAndSort();
  }

  private applyFiltersAndSort() {
    // copia el array original para no mutarlo
    let result = [...this.allProducts];

    // FILTRO BÚSQUEDA: incluye solo productos cuyo nombre o descripción coincida
    if (this.filters.searchQuery) {
      const searchLower = this.filters.searchQuery.toLowerCase();
      result = result.filter((p) => 
        (p.name && p.name.toLowerCase().includes(searchLower)) || 
        (p.description && p.description.toLowerCase().includes(searchLower))
      );
    }

    // FILTRO CATEGORÍA: incluye solo productos cuyo categoryId._id esté en el array
    if (this.filters.categories.length > 0) {
      result = result.filter((p) => this.filters.categories.includes(p.categoryId._id));
    }

    // FILTRO PRECIO: filtra según el rango seleccionado
    if (this.filters.priceRange) {
      const ranges = { low: [0, 300000], mid: [300000, 900000], high: [900000, Infinity] };
      const [min, max] = ranges[this.filters.priceRange];
      result = result.filter((p) => p.price >= min && p.price <= max);
    }

    // FILTRO RATING: incluye solo productos con rating >= al mínimo seleccionado
    if (this.filters.minRating) {
      result = result.filter((p) => p.rating >= this.filters.minRating!);
    }

    // SORT: mapa de funciones de comparación indexadas por SortState['field']
    // cada función recibe dos productos (a, b) y retorna:
    //   número negativo → a va primero
    //   número positivo → b va primero
    //   0              → mismo orden
    const sortFns: Record<string, (a: any, b: any) => number> = {
      featured: (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0), // destacados primero
      'price-asc': (a, b) => a.price - b.price, // menor precio primero
      'price-desc': (a, b) => b.price - a.price, // mayor precio primero
      rating: (a, b) => b.rating - a.rating, // mejor rating primero
    };

    // aplica la función correspondiente al sort actual
    // si no existe la función, () => 0 mantiene el orden actual
    result.sort(sortFns[this.sort.field] ?? (() => 0));

    // actualiza filteredProducts → Angular re-renderiza el @for automáticamente
    this.filteredProducts = result;
  }

  ngOnDestroy() {
    // emite para cancelar todas las suscripciones activas con takeUntil
    this.destroy$.next();
    this.destroy$.complete();
  }
}
