import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpCategory {
private base_url: string = 'http://localhost:3000/api/v1/categories';

  constructor(private http: HttpClient) {}

  createCategory( newCategory: any ): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/v1/categorias/create', newCategory);
  }

  getcategoryById( ): Observable<any> {
    return this.http.get<any>(`${this.base_url}/${this.slug}`);
  }

  getAllCategories(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/v1/categorias/get-all');
  }

  deleteCategory( id: string ){
    return this.http.delete(`${ this.base_url}/${id}`);
  }
}
