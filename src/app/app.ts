import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/layout/header/header';
import { Footer } from './shared/layout/footer/footer';
import { Navbar } from './shared/layout/navbar/navbar';
import { HttpAuth } from './core/services/http-auth';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Navbar, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('fullMoto');

  constructor(public httpAuth: HttpAuth) {}
}
