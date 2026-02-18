import { AsyncPipe } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, map } from 'rxjs';
import { HttpCategory } from '../../../core/services/http-category';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  categories!: Observable<any[]>;

  constructor(private httpCategory: HttpCategory) {}

  ngOnInit(): void {
    this.categories = this.httpCategory.getAllCategories().pipe(map((data) => data.categories));
  }
}
