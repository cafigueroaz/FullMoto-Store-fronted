import { Component } from '@angular/core';
import { HttpCategory } from '../../../../core/services/http-category';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';


@Component({
  selector: 'app-category-list',
  imports: [AsyncPipe],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
})
export class CategoryList {
  private refreshCategoryTrigger$: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);

  public categories: Observable<any[]> = new Observable<any[]>();

  constructor(private httpCategory: HttpCategory) {}

  ngOnInit() {
    this.categories = this.refreshCategoryTrigger$.pipe(
      switchMap( () => this.httpCategory.getAllCategories() )
    );
    // .pipe(
    //   map(data => {
    //     return data.data;
    //   }),
    //   catchError(error => {
    //     return of([]);
    //   }
    // ));
  }
}
