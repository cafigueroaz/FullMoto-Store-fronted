import { Component } from '@angular/core';
import { HttpCategory } from '../../../../core/services/http-category';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-category-list',
  imports: [AsyncPipe],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
})
export class CategoryList {
  public categories$: Observable<any[]> = new Observable<any[]>();

  constructor(private httpCategory: HttpCategory) {}

  ngOnInit() {
    this.categories$ = this.httpCategory.getAllCategories();
  }
}
