import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { HttpCategory } from '../../../../core/services/http-category';

@Component({
  selector: 'app-category-edit-form',
  imports: [ReactiveFormsModule],
  templateUrl: './category-edit-form.html',
  styleUrl: './category-edit-form.css',
})
export class CategoryEditForm {
  public formData: FormGroup;
  private registerSubscribe!: Subscription;
  public categoryId: string | null = null;

  constructor(
    private router: Router,
    private httpCategory: HttpCategory,
    private activatedRoute: ActivatedRoute,
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
      this.registerSubscribe = this.httpCategory
        .updateCategory(this.categoryId, this.formData.value)
        .subscribe({
          next: (data) => {
            console.log('Categoría actualizada:', data);
          },
          error: (err) => {
            console.error('Error al actualizar categoría:', err);
          },
          complete: () => {
            this.formData.markAllAsTouched();
            this.formData.reset({ status: true });
          },
        });
    } else {
      this.formData.markAllAsTouched();
      console.log('Formulario inválido');
    }
  }

  ngOnDestroy() {
    if (this.registerSubscribe) {
      this.registerSubscribe.unsubscribe();
    }
  }

  ngOnInit() {
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('id');

    console.log('Product Id recuperado:', this.categoryId);

    if (this.categoryId) {
      this.httpCategory.getcategoryById(this.categoryId).subscribe({
        next: (data) => {
          console.log('Categoria', data);

          this.formData.patchValue({
            name: data.name,
            description: data.description,
            status: data.status,
            image: data.image,
          });
        },
        error: (err) => {
          console.error('Error al obtener producto:', err);
        },
      });
    }
  }
}
