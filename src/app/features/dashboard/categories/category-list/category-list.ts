import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { HttpCategory } from '../../../../core/services/http-category';
import { Router } from '@angular/router'; // Importante para el onEdit
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-category-list',
  imports: [AsyncPipe],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryList {
  private refreshCategoryTrigger$ = new BehaviorSubject<void>(undefined);
  public categories$: Observable<any[]>;

  constructor(
    private httpCategory: HttpCategory,
    private router: Router,
  ) {
    this.categories$ = new Observable<any[]>();
  }

  ngOnInit() {
    this.categories$ = this.refreshCategoryTrigger$.pipe(
      switchMap(() => this.httpCategory.getAllCategories()),
    );
  }

  onDelete(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      this.httpCategory.deleteCategory(id).subscribe({
        next: (data) => {
          console.log('Categoría eliminada:', data);

          this.refreshCategoryTrigger$.next();
        },
        error: (err) => {
          console.error('Error al eliminar categoría:', err);
        },
      });
    }
  }

  onEdit(id: string) {
    this.router.navigate(['/dashboard', 'categorias', 'editar', id]);
  }
}
