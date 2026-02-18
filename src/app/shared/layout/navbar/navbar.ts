import { AsyncPipe } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { HttpCategory } from '../../../core/services/http-category';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  public categories$: Observable<any[]>;
  private refreshTrigger$ = new BehaviorSubject<void>(undefined);

  constructor(
    private httpCategory: HttpCategory,
    private router: Router,
  ) {
    this.categories$ = new Observable<any[]>();
  }

  ngOnInit() {
    this.categories$ = this.refreshTrigger$.pipe(
      switchMap(() => this.httpCategory.getAllCategories()),
    );
  }
}
