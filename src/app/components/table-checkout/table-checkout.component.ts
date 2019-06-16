import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Product} from "../../models/product";
import {ProductService} from "../../services/product/product.service";

@Component({
  selector: 'app-table-checkout',
  templateUrl: './table-checkout.component.html',
  styleUrls: ['./table-checkout.component.scss']
})
export class TableCheckoutComponent implements OnInit {

  // todo list of ordered things
  // todo payment
  constructor(private router: Router,
              private productService: ProductService) { }

  products: Product[];
  ngOnInit() {
    this.products = this.productService.getLocalProducts();
  }

  navBackToOrder() {
    this.router.navigate(['table/table-order'])
  }

  doPayment() {

  }
}
