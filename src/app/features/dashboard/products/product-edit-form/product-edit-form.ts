import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { HttpProduct } from '../../../../core/services/http-product';
import { ActivatedRoute, Router } from '@angular/router';
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
  public productId: string | null = null;

  constructor(
    private httpProduct: HttpProduct,
    private router: Router,
    private httpCategoy: HttpCategory,
    private activatedRoute: ActivatedRoute,
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
      this.registerSuscribe = this.httpProduct
        .updateProduct(this.productId, this.formData.value)
        .subscribe({
          next: (data) => {
            console.log('Producto actualizado', data);
          },
          error: (err) => {
            console.log('Error al actualizar producto', err);
          },
          complete: () => {
            this.formData.markAllAsTouched();
            this.formData.reset();
          },
        });

      console.log('Datos del nuevo producto', this.formData.value);
    } else {
      console.log('Formulario invalido');
    }
  }

  ngOnDestroy() {
    if (this.registerSuscribe) {
      this.registerSuscribe.unsubscribe();
    }
  }

  ngOnInit() {
    this.categories$ = this.httpCategoy.getAllCategories();
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');

    console.log('Product Id recuperado:', this.productId);

    if (this.productId) {
      this.httpProduct.getProductById(this.productId).subscribe({
        next: (data) => {
          console.log('Producto', data);

          this.formData.patchValue({
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
            categoryId: data.categoryId?._id || data.categoryId,
            brand: data.brand,
            mainImage: data.mainImage,
          });
        },
        error: (err) => {
          console.error('Error al obtener producto:', err);
        },
      });
    }
  }
}
