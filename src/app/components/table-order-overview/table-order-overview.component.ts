import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../../services/product/product.service";
import {Product} from "../../models/product";
import {log} from "util";
import {OrderType} from "../../util/ordertype";
import {LocalOrder} from "../../models/localorder";
import {OrderService} from "../../services/order/order.service";

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
              private productService: ProductService,
              private orderService: OrderService) { }

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
    this.confirmOrderPreparation();
    this.orderList = [];
  }

  confirmOrderPreparation() {
    const localOrder: LocalOrder = {
      userId: localStorage.getItem('id'),
      totalPrice: this.productService.calculateTotal(this.orderList),
      totalVat: 9,
      tableNumber: this.hackTableNumber(),
      couponId: '',
      date: Date.now().toString(),
      paymentId: '',
      status: {status: 'Unpaid'},
      id: '',
      type: [OrderType.LOCAL]
    };
    this.orderService.createLocalOrder(
      localOrder.userId,
      localOrder.totalPrice,
      localOrder.totalVat,
      localOrder.tableNumber,
      localOrder.status).subscribe(x => log('confirm order returned'))
  }

  goToPayment() {
    log('going to payment: ' + this.orderedList.length);
    this.productService.saveProductListLocal(this.orderedList);
    this.router.navigate(['table/table-checkout']);
  }

  private hackTableNumber(): number {
    // let email = localStorage.getItem('email');
    // log(email);
    // const tableNumber = email.substring(0, email.indexOf('table'));
    // log(tableNumber);
    // if(parseInt(tableNumber)){
    //   return parseInt(tableNumber);
    // } else {
    //   return 1;
    // }
    return 1;
  }
}
