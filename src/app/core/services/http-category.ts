import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpCategory {
  constructor(private http: HttpClient) {}

  getAllCategories(): any {
    return this.http.get<any>('http://localhost:3000/api/v1/categorias/get-all');
  }
}
