import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HttpAuth } from '../../../core/services/http-auth';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterOutlet, AsyncPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  constructor(
    public router: Router,
    public httpAuth: HttpAuth,
  ) {}

  get pageTitle(): string {
    const url = this.router.url;
    if (url.includes('productos/crear')) return 'Crear Producto';
    if (url.includes('productos/editar')) return 'Editar producto';
    if (url.includes('productos')) return 'Lista de Productos';
    if (url.includes('categorias/crear')) return 'Nueva Categoría';
    if (url.includes('categorias')) return 'Lista de Categorías';
    if (url.includes('usuarios')) return 'Usuarios';

    return 'Dashboard';
  }
}
