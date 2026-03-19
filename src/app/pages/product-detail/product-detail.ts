import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpProduct } from '../../core/services/http-product';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {

  product: any;
  selectedImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: HttpProduct
  ) {}

  ngOnInit() {

    const id = String(this.route.snapshot.paramMap.get('id'));

    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.selectedImage = data.images?.[0];
      }
    });

  }

  changeImage(img: string){
    this.selectedImage = img;
  }

}


