import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../models/category';
import {AuthService} from '../../services/auth/auth.service';
import {ProductService} from '../../services/product/product.service';
import {CategoryService} from '../../services/category/category.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productForm: FormGroup;
  categories: Category[];

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
  }

  ngOnInit() {
    //this.checkIfAdmin();

    this.categoryService.getAllCategories().subscribe(
        data => {
          this.categories = data;
        },
        error => {
          console.error(error);
        }
    );
  }

  checkIfAdmin() {
    if (!this.authService.isAdmin()) {
      alert('Login as admin to continue');
      this.router.navigateByUrl('/login');
    }
  }

  createProduct() {
    if (this.productForm.invalid) {
      alert('Please fill all fields correctly');
      return;
    }

    alert('added new product');
  }

}
