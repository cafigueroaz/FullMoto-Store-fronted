import { Component } from '@angular/core';
import { FavoritesService } from '../../core/services/favorite.services';
import { RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-favorite',
  imports: [RouterLink, AsyncPipe, CurrencyPipe],
  templateUrl: './favorite.html',
  styleUrl: './favorite.css',
})
export class Favorite implements OnInit {
  constructor(public favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.favoritesService.loadFavorites();
  }

  removeItem(productId: string): void {
    if (!productId) return;
    this.favoritesService.removeItem(productId);
  }

  clearFavorites(): void {
    this.favoritesService.clearFavorites();
  }
}
