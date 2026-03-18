import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { HttpFavorites } from './http-favorite';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoriteItems$ = new BehaviorSubject<any[]>([]);

  public items$ = this.favoriteItems$.asObservable();

  public itemCount$ = this.favoriteItems$.pipe(
    map((items) => items.length)
  );

  constructor(private httpFavorites: HttpFavorites) {}

  loadFavorites(): void {
    this.httpFavorites.getFavorites().subscribe({
      next: (res) => this.favoriteItems$.next(res?.items ?? []),
      error: () => this.favoriteItems$.next([]),
    });
  }

  addItem(productId: string, quantity: number, price: number): void {
    this.httpFavorites.addItem(productId, quantity, price).subscribe({
      next: (res) => {
        if (res?.favorites?.items) {
          this.favoriteItems$.next(res.favorites.items);
        }
      },
    });
  }

  removeItem(productId: string): void {
    this.httpFavorites.removeItem(productId).subscribe({
      next: (res) => {
        if (res?.favorites?.items) {
          this.favoriteItems$.next(res.favorites.items);
        }
      },
    });
  }

  clearFavorites(): void {
    this.httpFavorites.clearFavorites().subscribe({
      next: () => this.favoriteItems$.next([]),
    });
  }
}
