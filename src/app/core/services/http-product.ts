import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpProduct {
private base_url: string = 'http://localhost:3000/api/v1/products';
  private slug: string = 'categories';

  constructor(private http: HttpClient) { }

  getProducts(id: number): Observable<any> {
    return this.http.get(`${this.base_url}/${id}`);
  }

  createProduct(newProduct: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/v1/products/create', newProduct);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.base_url}/${id}`);
  }
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/v1/products/get-all').pipe(
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
