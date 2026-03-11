import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Products } from '../home/products/products';
import { Hero } from './hero/hero';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Products, Hero],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
