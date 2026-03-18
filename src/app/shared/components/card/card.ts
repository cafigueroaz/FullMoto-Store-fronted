import { Component, Input } from '@angular/core';
import { CurrencyPipe, AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { FavoritesService } from '../../../core/services/favorite.services';
import { map, Observable} from 'rxjs';

@Component({
  selector: 'app-card',
  imports: [CurrencyPipe, AsyncPipe],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  constructor(private router: Router, private favoritesService: FavoritesService) {}

  @Input() product!: any; //@Input() es un decorador de Angular que permite que un componente reciba datos desde su componente padre.
  isFavorite$!: Observable<boolean>;

   ngOnInit() {
    // ← verifica si el producto ya está en favoritos
    this.isFavorite$ = this.favoritesService.items$.pipe(
      map(items => items.some(item => item.productId._id === this.product._id))
    );
  }

  toGo(id: string) {
    this.router.navigate(['/producto', id]);
  }

  addToFavorites() {
    if (!this.product?._id) return;
    this.favoritesService.addItem(
      this.product._id,
      1,
      this.product.price
    );
  }
}
