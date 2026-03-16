import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpAuth } from '../../core/services/http-auth';

@Component({
  selector: 'app-profile-page',
  imports: [RouterOutlet, RouterLink, AsyncPipe],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage {
  constructor(public httpAuth: HttpAuth) {}
}
