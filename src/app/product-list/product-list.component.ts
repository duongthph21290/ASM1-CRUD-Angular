import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IProduct } from "../interfaces/Products";
import { ProductService } from "../services/services.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  @Input() products: IProduct[] = [];
  @Output() onRemove = new EventEmitter<number>();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
  ngOnInit() {
    this.route.params.subscribe((param) => {
      const id = param["id"];
      if (id) {
        this.getProductById(id);
      } else {
        this.getAllProducts();
      }
    });
  }

  getAllProducts() {
    this.productService.getProducts().subscribe(
      (data: IProduct[]) => {
        this.products = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getProductById(id: number) {
    this.productService.getProductById(id).subscribe(
      (data: IProduct) => {
        if (data) {
          this.products = [data];
        } else {
          this.products = [];
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  removeItem(id: any) {
    if (confirm("Bạn có chắc chắn muốn xóa không?")) {
      this.productService.deleteProduct(id).subscribe(
        (product) => {
          this.products = this.products.filter((product) => product.id !== id);
          alert("Xóa sản phẩm thành công!");
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
