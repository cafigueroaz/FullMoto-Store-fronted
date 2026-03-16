import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-confirmacion',
  imports: [CommonModule, RouterLink],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.css',
})
export class Confirmation {
  orderId: string = '';
  total: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    const state = history.state;
    if (!state?.orderId) {
      this.router.navigate(['/catalogo']);
      return;
    }
    this.orderId = state.orderId;
    this.total = state.total;
  }
}
