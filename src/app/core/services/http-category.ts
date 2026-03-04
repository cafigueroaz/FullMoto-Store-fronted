import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpCategory {
  private base_url: string = 'http://localhost:3000/api/v1/categorias';

  constructor(private http: HttpClient) {}

  createCategory(newCategory: any): Observable<any> {
    return this.http.post<any>(this.base_url + '/created', newCategory);
  }

  getcategoryById(id: string): Observable<any> {
    return this.http.get(`${this.base_url}/${id}`);
  }
  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.base_url).pipe(
      tap((data) => {
        console.log(data);
      }),
      catchError((error) => of([])),
    );
  }

  deleteCategory(id: string) {
    return this.http.delete(`${this.base_url}/delete/${id}`);
  }

  updateCategory(id: String | null, data: any): Observable<any> {
    return this.http.patch<any>(`${this.base_url}/${id}`, data);
  }
}
