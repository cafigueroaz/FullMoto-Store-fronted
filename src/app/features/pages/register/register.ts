import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpUser } from '../../../core/services/http-user';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  public formData!: FormGroup;
  public successMessage: string = '';

  constructor(
    private httpUser: HttpUser,
    private router: Router,
  ) {
    this.formData = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      // username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      // role: new FormControl(''),
    });
  }

  onSubmit() {
    if (this.formData.valid) {
      this.httpUser.createUser(this.formData.value).subscribe({
        next: (data) => {
          console.log('Crea un usuario exitosamente', data);
        },
        error: (err) => {
          console.error('Error al crear usuario', err);
        },
        complete: () => {
          this.successMessage = 'Usuario registrado exitosamente.';
          this.formData.reset();
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
      });
    }
  }

  ngOnInit(): void {}
}
