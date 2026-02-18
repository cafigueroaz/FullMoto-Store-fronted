import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpCategory {
  private base_url: string = 'http://localhost:3000/api/v1/';
  private slug: string = 'categories';

  constructor(private http: HttpClient) {}

  createCategory(newCategory: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/v1/categorias/create', newCategory);
  }

  getcategoryById(id: string): Observable<any> {
    return this.http.get(`${this.base_url}/${this.slug} /${id}`);
  }
  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/v1/categorias/get-all').pipe(
      tap((data) => {
        console.log(data);
      }),
      catchError((error) => of([])),
    );
  }

  deleteCategory(id: string) {
    return this.http.delete(`${this.base_url}/${this.slug}/${id}`);
  }
}
