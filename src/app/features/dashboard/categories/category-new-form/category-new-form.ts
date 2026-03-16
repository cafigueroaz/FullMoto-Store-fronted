import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { HttpCategory } from '../../../../core/services/http-category';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-category-new-form',
  imports: [ReactiveFormsModule],
  templateUrl: './category-new-form.html',
  styleUrl: './category-new-form.css',
})
export class CategoryNewForm {
  public formData: FormGroup;
  private registerSubscribe!: Subscription;
  public categories$: Observable<any[]> = new Observable<any[]>();

  constructor(
    private router: Router,
    private httpCategory: HttpCategory,
  ) {
    this.formData = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      status: new FormControl(true, [Validators.required]),
    });
  }

  get formDataName() {
    return this.formData.get('name');
  }
  get formDataSlug() {
    return this.formData.get('slug');
  }
  get formDataDescription() {
    return this.formData.get('description');
  }
  get formDataImage() {
    return this.formData.get('image');
  }
  get formDataStatus() {
    return this.formData.get('status');
  }

  onSubmit() {
    if (this.formData.valid) {
      this.registerSubscribe = this.httpCategory.createCategory(this.formData.value).subscribe({
        next: (data) => {
          console.log('Categoría creada exitosamente:', data);
          this.router.navigateByUrl('/dashboard/categories');
        },
        error: (err) => {
          console.error('Error al crear categoría:', err);
        },
        complete: () => {
          this.formData.reset({ status: true });
        },
      });
    } else {
      this.formData.markAllAsTouched();
      console.log('Formulario inválido');
    }
  }

  ngOnDestroy() {
    console.log('Limpiando suscripciones...');
    if (this.registerSubscribe) {
      this.registerSubscribe.unsubscribe();
    }
  }
}
