import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/layout/header/header';
import { Footer } from './shared/layout/footer/footer';
import { Navbar } from './shared/layout/navbar/navbar';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('fullMoto');
}
