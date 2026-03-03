import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { HttpProduct } from '../../../../core/services/http-product';
import { Router } from '@angular/router';
import { HttpCategory } from '../../../../core/services/http-category';

@Component({
  selector: 'app-product-edit-form',
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './product-edit-form.html',
  styleUrl: './product-edit-form.css',
})
export class ProductEditForm {
  public formData!: FormGroup;
  public registerSuscribe!: Subscription;
  public categories$: Observable<any[]> = new Observable<any[]>();

  constructor(
    private httpProduct: HttpProduct,
    private router: Router,
    private httpCategoy: HttpCategory,
  ) {}

  get formDataName() {
    return this.formData.get('name');
  }

  get formDataDescription() {
    return this.formData.get('description');
  }

  get formDataStock() {
    return this.formData.get('stock');
  }

  get formDataPrice() {
    return this.formData.get('price');
  }

  onSubmit() {
    if (this.formData.valid) {
      this.registerSuscribe = this.httpProduct.createProduct(this.formData.value).subscribe({
        next: (data) => {
          console.log('Producto creado', data);
        },
        error: (err) => {
          console.log('Error al crear producto', err);
        },
        complete: () => {
          this.formData.reset();
        },
      });

      console.log('Datos del nuevo producto', this.formData.value);
    } else {
      console.log('Formulario invalido');
    }
  }

  ngOnDestroy() {
    console.log('muere suscripcion nuevo produxcto');
    if (this.registerSuscribe) {
      this.registerSuscribe.unsubscribe;
    }
  }

  ngOnInit() {
    this.categories$ = this.httpCategoy.getAllCategories();
  }
}
