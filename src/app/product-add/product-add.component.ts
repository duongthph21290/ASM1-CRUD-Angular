import { Component } from '@angular/core';
import { IProduct } from '../interfaces/Products';
import { ProductService } from '../services/services.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent {

  productForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    price: [0],
    image: [''],
    description: [''],
  })
  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  onHandleSubmit() {
    if (this.productForm.valid) {
      const product: IProduct = {
        name: this.productForm.value.name || "",
        price: this.productForm.value.price || 0,
        image: this.productForm.value.name || "",
        description: this.productForm.value.name || "",
      }
      this.productService.addProduct(product).subscribe(product => {
        alert('Thêm sản phẩm thành công ✅');
        this.router.navigate([""]);
      })
    }

  }
}
