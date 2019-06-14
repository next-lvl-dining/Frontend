import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {CategoryService} from '../../services/category/category.service';
import {Router} from '@angular/router';
import {Category} from '../../models/category';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

    categoryForm: FormGroup;
    categories: Category[];
    selectedOption: string;


    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private categoryService: CategoryService,
        private router: Router
    ) {
        this.categoryForm = this.formBuilder.group({
            name: ['', Validators.required]
        });
    }

    ngOnInit() {
        //this.checkIfAdmin();

        this.categoryService.getAllCategories().subscribe(
            data => {
                this.categories = data;
                //console.log(data);
            },
            error => {
                console.error(error);
            }
        );

        console.log(this.selectedOption);
    }

    checkIfAdmin() {
        if (!this.authService.hasRole('admin')) {
            alert('Login as admin to continue');
            this.router.navigateByUrl('/login');
        }
    }

    createCategory() {
        if (this.categoryForm.invalid) {
            alert('Please fill all fields correctly');
        } else {

            const category: Category = {
                name: this.categoryForm.value.name,
            };

            console.log(category);

            this.categoryService.createCategory(category).subscribe();
            this.categoryForm.reset();
            alert('Added new category');
        }
    }

    deleteCategory() {
        if (this.selectedOption != null) {
            const category: Category = {
                name: this.selectedOption,
            };

            console.log(category)
            this.categoryService.deleteCategory(category);
        }
    }
}
