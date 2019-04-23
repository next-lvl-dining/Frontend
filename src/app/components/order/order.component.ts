import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product/product.service';
import {Item} from '../../models/item';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  private products: Product[];
  private items: Item[] = [];
  private total: number = 0;
  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit() {
    this.products = this.productService.findAll();
  }

  add(id: string) {
    var item: Item = {
      product: this.productService.find(id),
      quantity: 1
    };
    if (localStorage.getItem('cart') == null) {
      let cart: any = [];
      cart.push(JSON.stringify(item));
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      let cart: any = JSON.parse(localStorage.getItem('cart'));
      let index: number = -1;
      for (var i = 0; i < cart.length; i++) {
        let item: Item = JSON.parse(cart[i]);
        if (item.product.id == id) {
          index = i;
          break;
        }
      }
      if (index == -1) {
        cart.push(JSON.stringify(item));
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        let item: Item = JSON.parse(cart[index]);
        item.quantity += 1;
        cart[index] = JSON.stringify(item);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }
  }
  cartCount(): number {
    this.total = 0;
    let cart = JSON.parse(localStorage.getItem('cart'));
    for (var i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      this.total += item.quantity;
    }
    return this.total;
  }
}
