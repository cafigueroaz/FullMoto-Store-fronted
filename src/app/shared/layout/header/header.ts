import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpAuth } from '../../../core/services/http-auth';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-header',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(public httpAuth: HttpAuth, private router: Router) {}

  onLogout() {
    this.httpAuth.logout();
}

}
