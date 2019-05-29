import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product/product.service';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../models/category';
import {CategoryService} from '../../services/category/category.service';

@Component({
    selector: 'app-new-product',
    templateUrl: './new-product.component.html',
    styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
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
