import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../../services/product/product.service";
import {Product} from "../../models/product";
import {log} from "util";

@Component({
  selector: 'app-table-order-overview',
  templateUrl: './table-order-overview.component.html',
  styleUrls: ['./table-order-overview.component.scss']
})
export class TableOrderOverviewComponent implements OnInit {
  productList: Product[] = [];
  public orderList: Product[] = [];
  public orderedList: Product[] = [];

  constructor(private router: Router,
              private productService: ProductService) { }

  ngOnInit() {
    log(this.productList.length + " " + this.orderedList.length + " " + this.orderList.length);
    this.productService.getAll().subscribe(x => this.productList = x);
    this.orderedList = this.productService.getLocalProducts();
    log(this.orderedList.length)
  }

  addToOrderList(product: Product) {
    log('adding product: ' + product.name);
    this.orderList.push(product);
  }

  confirmOrderList() {
    log('confirming order: ' + this.orderList.length + " into " + this.orderedList.length);
    this.orderedList = this.orderedList.concat(this.orderList);
    //todo send order to kitchen
    this.orderList = [];
  }

  goToPayment() {
    log('going to payment: ' + this.orderedList.length);
    this.productService.saveProductListLocal(this.orderedList);
    this.router.navigate(['table/table-checkout']);
  }
}
