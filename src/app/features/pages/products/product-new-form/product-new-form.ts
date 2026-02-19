import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpCategory } from '../../../../core/services/http-category.js';
import { HttpProduct } from '../../../../core/services/http-product.js';
import { Observable, tap, map, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-new-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-new-form.html',
  styleUrl: './product-new-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductNewForm {
  public formData!: FormGroup;
  public registerSuscribe!: Subscription;

  constructor(
    private httpProduct: HttpProduct,
    private router: Router,
  ) {
    this.formData = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(140),
      ]),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
      stock: new FormControl(0, [Validators.required, Validators.min(0)]),
      categoryId: new FormControl('', [Validators.required]),
      brand: new FormControl(''),
      compatibleWith: new FormControl(''),
      mainImage: new FormControl(''),
      imageGallery: new FormControl(''),
      status: new FormControl('active'),
    });
  }

  //getters ----

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
          console.log(data);
          this.router.navigateByUrl('/dashboard/products');
        },
        error: (err) => {
          console.log(err);
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
}
