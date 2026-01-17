import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpCategory } from '../../../../core/services/http-category.js';
import { HttpProduct } from '../../../../core/services/http-product.js';
@Component({
  selector: 'app-product-new-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-new-form.html',
  styleUrl: './product-new-form.css',
})
export class ProductNewForm {
  public formData!: FormGroup;
  categories: any[] = [];

  constructor(private httpCategory: HttpCategory, private httpProduct: HttpProduct) {
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
    this.httpProduct.createProduct(this.formData.value);
  }

  ngOnInit(): void {
    this.httpCategory.getAllCategories().subscribe((data: any) => {
      this.categories = data.categories;
      console.log(data.categories);
    });
  }
}
