import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpCategory } from '../../../../core/services/http-category.js';
import { HttpProduct } from '../../../../core/services/http-product.js';
import { Observable, tap, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-product-new-form',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './product-new-form.html',
  styleUrl: './product-new-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductNewForm {
  public formData!: FormGroup;
  categories!: Observable<any[]>;

  constructor(
    private httpCategory: HttpCategory,
    private httpProduct: HttpProduct,
  ) {
    this.formData = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl(''),
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

  onSubmit() {
    {
      if (this.formData.valid) {
        console.log('Producto creado:', this.formData.value);
        this.httpProduct.createProduct(this.formData.value).subscribe({
          //Nuevo objeto observable
          next: (data) => {
            console.log('Crea un producto exitosamente', data);
          },
          error: (err) => {
            console.error('Error al crear el producto', err);
          },
          complete: () => {
            console.log('Solicitud de creación de producto completada');
            this.formData.reset();
          },

          // (response) => { console.log('Producto creado:', response); } Anterior CallBack
        });
      } else {
        console.log('Formulario invalido');
      }
    }
  }

  ngOnInit(): void {
    this.categories = this.httpCategory.getAllCategories().pipe(map((data) => data.categories));
    console.log(this.categories);
  }

  onReset() {
    this.formData.setValue({
      name: '',
      description: '',
      price: 0,
      stock: 0,
      categoryId: '',
      brand: '',
      compatibleWith: '',
      mainImage: '',
      imageGallery: '',
      status: 'active',
    });
  }
}
