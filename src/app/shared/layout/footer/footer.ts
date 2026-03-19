import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpCategory } from '../../../core/services/http-category';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { HttpAuth } from '../../../core/services/http-auth';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  public categories$: Observable<any[]>;
  private refreshTrigger$ = new BehaviorSubject<void>(undefined);

  constructor(
    private httpCategory: HttpCategory,
    public httpAuth: HttpAuth,
  ) {
    this.categories$ = new Observable<any[]>();
  }

  ngOnInit() {
    this.categories$ = this.refreshTrigger$.pipe(
      switchMap(() => this.httpCategory.getAllCategories()),
    );
  }
}
