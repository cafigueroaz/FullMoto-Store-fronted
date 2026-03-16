import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpUser } from '../../../../core/services/http-user';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpAuth } from '../../../../core/services/http-auth';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-users-edit-form',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './users-edit-form.html',
  styleUrl: './users-edit-form.css',
})
export class UsersEditForm {
  public formData!: FormGroup;
  public registerSuscribe!: Subscription;
  public userId!: string | null;

  constructor(
    private httpUser: HttpUser,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public httpAuth: HttpAuth,
  ) {
    this.formData = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('', [Validators.required]),
      isActive: new FormControl('true'),
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  onSubmit() {
    if (this.formData.valid) {
      const payload = {
        ...this.formData.value,
        isActive: this.formData.value.isActive === 'true',
      };

      this.registerSuscribe = this.httpUser.updateUser(this.userId, payload).subscribe({
        next: (data) => {
          console.log('Usuario actualizado', data);
          this.router.navigate(['/dashboard/usuarios']);
        },
        error: (err) => {
          console.error('Error al actualizar usuario', err);
        },
        complete: () => {
          this.formData.reset();
        },
      });
    } else {
      this.formData.markAllAsTouched();
      console.log('Formulario inválido');
    }
  }

  ngOnDestroy() {
    if (this.registerSuscribe) {
      this.registerSuscribe.unsubscribe();
    }
  }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');

    console.log('Usuario Id recuperado:', this.userId);

    if (this.userId) {
      this.httpUser.getUserById(this.userId).subscribe({
        next: (data) => {
          console.log('Usuario', data);

          this.formData.patchValue({
            name: data.name,
            email: data.email,
            role: data.role,
            isActive: String(data.isActive),
            username: data.username,
          });
        },
        error: (err) => {
          console.error('Error al obtener el usuario:', err);
        },
      });
    }
  }
}
