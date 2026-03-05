import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpAuth } from './http-auth';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class HttpProduct {
  private apiUrl: string = environment.apiUrl;
  private slug: string = 'products';

  constructor(
    private http: HttpClient,
    private httpAuth: HttpAuth,
  ) {}

  createProduct(productData: any) {
    console.info('Headers', this.httpAuth.getHeader());
    return this.http.post(`${this.apiUrl}/${this.slug}`, productData, {
      headers: this.httpAuth.getHeader(),
    });
  }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${this.slug}`);
  }

  deleteProduct(productDelete: any): Observable<any> {
    console.info('Headers', this.httpAuth.getHeader());
    return this.http.delete(`${this.apiUrl}/${this.slug}/${productDelete}`, {
      headers: this.httpAuth.getHeader(),
    });
  }

  getProductById(id: String): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.slug}/${id}`);
  }

  updateProduct(id: String | null, data: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${this.slug}/${id}`, data, {
      headers: this.httpAuth.getHeader(),
    });
  }
}
