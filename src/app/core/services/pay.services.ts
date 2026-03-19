import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpAuth } from './http-auth';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl: string = environment.apiUrl;
  private slug: string = 'orders';

  constructor(
    private http: HttpClient,
    private httpAuth: HttpAuth,
  ) {}

  getOrder(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.slug}`, {
      headers: this.httpAuth.getHeader(),
    });
  }

  confirmOrder(paymentMethod: string): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/${this.slug}/confirm`,
      { paymentMethod },
      { headers: this.httpAuth.getHeader() },
    );
  }

  getOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.slug}/my-orders`, {
      headers: this.httpAuth.getHeader(),
    });
  }

  getMyOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.slug}/my-orders`, {
      headers: this.httpAuth.getHeader(),
    });
  }
}
