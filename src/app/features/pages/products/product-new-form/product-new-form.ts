import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-product-new-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-new-form.html',
  styleUrl: './product-new-form.css',
})
export class ProductNewForm {
  formData!: FormGroup;

  constructor() {
    this.formData = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(0),
      stock: new FormControl(0),
      categoryId: new FormControl(''),
      brand: new FormControl(''),
      productType: new FormControl(''),
      compatibleWith: new FormControl(''),
      mainImage: new FormControl(''),
      imageGallery: new FormControl(''),
      status: new FormControl(''),
    });
  }

  onSubmit() {
    console.log(this.formData.value);
  }
}
