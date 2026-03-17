import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { HttpUser } from '../../../../core/services/http-user'; // ajusta ruta
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { HttpAuth } from "../../../../core/services/http-auth";

function passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
  const newPassword = form.get('newPassword')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;
  return newPassword === confirmPassword ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-user-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './user-change-password.html',
  styleUrl: './user-change-password.css',
})
export class UserChangePassword {

  public formData!: FormGroup;
  public isLoading = false;
  public errorMessage = '';
  public successMessage = '';

  constructor(
    private httpUser: HttpUser,
    private httpAuth: HttpAuth,
  ) {
    this.formData = new FormGroup({
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, { validators: passwordMatchValidator });
  }

  async onSubmit() {
    if (this.formData.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      try {
        const user = await firstValueFrom(this.httpAuth.currentUser$);
        if (!user?._id) return;

        const payload = {
          currentPassword: this.formData.value.currentPassword,
          newPassword: this.formData.value.newPassword,
        };

        await firstValueFrom(this.httpUser.changePassword(user._id, payload));

        this.successMessage = '¡Contraseña actualizada correctamente!';
        this.formData.reset();

      } catch (err: any) {
        this.errorMessage = err?.error?.msg || 'Error al cambiar la contraseña';
      } finally {
        this.isLoading = false;
      }
    } else {
      this.formData.markAllAsTouched();
    }
  }
}
