import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../models/category';
import { AuthService } from '../../services/auth/auth.service';
import { ProductService } from '../../services/product/product.service';
import { CategoryService } from '../../services/category/category.service';
import { Router } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productForm: FormGroup;
  changeProductForm: FormGroup;
  categories: Category[];
  products: Product[];
  selectedProduct = new Product;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      vat: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required]
    });

    this.changeProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      vat: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.checkIfAdmin();
    this.getAll();
  }

  checkIfAdmin() {
    if (!this.authService.hasRole('admin')) {
      alert('Login as admin to continue');
      this.router.navigateByUrl('/login');
    }
  }

  createProduct() {
    if (this.productForm.invalid) {
      alert('Please fill all fields correctly');
    } else {
      const category: Category = {
        name: this.productForm.value.category
      };

      const product: any = {
        name: this.productForm.value.name,
        price: this.productForm.value.price,
        vat: this.productForm.value.vat,
        category
      };

      console.log(product);

      this.productService.createProduct(product).subscribe();
      alert('Added new product');
    }
  }

  setProduct() {
    this.changeProductForm.controls.name.setValue(this.selectedProduct.name);
    this.changeProductForm.controls.price.setValue(this.selectedProduct.price);
    this.changeProductForm.controls.vat.setValue(this.selectedProduct.vat);
    this.changeProductForm.controls.category.setValue(this.selectedProduct.category);
  }

  changeProduct() {
    if (this.changeProductForm.invalid) {
      alert('Please fill all fields correctly');
    } else {
      const category: Category = {
        name: this.changeProductForm.value.category
      };

      const product: any = {
        id: this.selectedProduct.id,
        name: this.changeProductForm.value.name,
        price: this.changeProductForm.value.price,
        vat: this.changeProductForm.value.vat,
        category
      };

      console.log(JSON.stringify(product));

      this.productService.updateProduct(product).subscribe();
      alert('Updated product');
    }
  }

  deleteProduct() {
    if (this.selectedProduct != null) {
      this.productService.deleteProduct(this.selectedProduct);
    }
  }

  getAll() {
    this.categoryService.getAllCategories().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.error(error);
      }
    );

    this.productService.getAll().subscribe(
      data => {
        this.products = data;
      },
      error => {
        console.error(error);
      }
    );
  }

  ToggleForm() {

  }
}
