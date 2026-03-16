import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { HttpUser } from '../../../../core/services/http-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  imports: [AsyncPipe],
  templateUrl: './users-list.html',
  styleUrl: './users-list.css',
})
export class UsersList {
  public users$: Observable<any[]>;
  private refreshTrigger$ = new BehaviorSubject<void>(undefined);

  constructor(
    private httpUser: HttpUser,
    private router: Router,
  ) {
    this.users$ = new Observable<any[]>();
  }

  ngOnInit() {
    this.users$ = this.refreshTrigger$.pipe(switchMap(() => this.httpUser.getAllUsers()));
  }

  onDelete(id: String) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.httpUser.deleteUser(id).subscribe({
        next: (data) => {
          console.log('Respuesta del servidor:', data);
          this.refreshTrigger$.next();
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
        },
      });
    }
  }

  onEdit(id: string) {
    this.router.navigate(['/dashboard', 'usuarios', 'editar', id]);
  }
}
