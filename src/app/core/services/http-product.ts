import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpProduct {
  constructor(private http: HttpClient) {}

  createProduct(productData: any) {
    return this.http.post('http://localhost:3000/api/v1/products', productData);
  }
}
