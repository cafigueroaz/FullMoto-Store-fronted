import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpProduct {
  base_url: string = 'http://localhost:3000/api/v1/products';
  constructor(private http: HttpClient) {}

  createProduct(productData: any) {
    return this.http.post(this.base_url, productData);
  }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.base_url);
  }

  deleteProduct(productDelete: any): Observable<any> {
    return this.http.delete(`${this.base_url}/${productDelete}`);
  }
}
