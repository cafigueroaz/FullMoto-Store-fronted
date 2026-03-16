import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Products } from './products/products';
import { Hero } from './hero/hero';

@Component({
  selector: 'app-home',
  imports: [Products, Hero],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
