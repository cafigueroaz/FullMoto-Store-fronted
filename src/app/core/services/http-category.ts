import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { HttpAuth } from './http-auth';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class HttpCategory {
  private apiUrl: string = environment.apiUrl;
  private slug: string = 'categorias';

  constructor(
    private http: HttpClient,
    private httpAuth: HttpAuth,
  ) {}

  createCategory(newCategory: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${this.slug}/created`, newCategory, {
      headers: this.httpAuth.getHeader(),
    });
  }

  getcategoryById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.slug}/${id}`);
  }
  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${this.slug}`).pipe(
      tap((data) => {
        console.log(data);
      }),
      catchError((error) => of([])),
    );
  }

  deleteCategory(id: string) {
    return this.http.delete(`${this.apiUrl}/${this.slug}/delete/${id}`, {
      headers: this.httpAuth.getHeader(),
    });
  }

  updateCategory(id: String | null, data: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${this.slug}/${id}`, data, {
      headers: this.httpAuth.getHeader(),
    });
  }
}
