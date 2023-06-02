import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../interfaces/Products';
import { ProductService } from '../services/services.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-product-edit',
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent {
    product!: IProduct;
    productForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(4)]],
        price: [0],
        image: ['', [Validators.required]],
        description: ['', [Validators.required]],
    });

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder
    ) {
        this.route.paramMap.subscribe((param) => {
            const id = Number(param.get('id'));
            this.productService.getProductById(id).subscribe(
                (product) => {
                    this.product = product;
                    // Set giá trị từ API vào input form
                    this.productForm.patchValue({
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        description: product.description,
                    });
                },
                (error) => console.log(error.message)
            );
        });
    }

    // Xử lí hàm Update product
    onHandleUpdate() {
        // console.log(this.product);

        if (this.productForm.valid) {
            const newProduct: IProduct = {
                id: this.product.id,
                name: this.productForm.value.name || '',
                price: this.productForm.value.price || 0,
                image: this.productForm.value.image || '',
                description: this.productForm.value.description || '',
            };
            this.productService.updateProduct(newProduct).subscribe(
                () => {
                    {
                        alert('Cập nhật sản phẩm thành công ✅');
                        this.router.navigate([""]);
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }
}
