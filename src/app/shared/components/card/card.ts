import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [CurrencyPipe],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  constructor(private router: Router) {}

  @Input() product!: any; //@Input() es un decorador de Angular que permite que un componente reciba datos desde su componente padre.

  toGo(id: string) {
    this.router.navigate(['/producto', id]);
  }
}
