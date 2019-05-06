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
  private total = 0;
  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit() {
    this.products = this.productService.findAll();
  }

  add(id: string) {
    const item: Item = {
      product: this.productService.find(id),
      quantity: 1
    };
    if (localStorage.getItem('cart') == null) {
      const cart: any = [];
      cart.push(JSON.stringify(item));
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      const cart: any = JSON.parse(localStorage.getItem('cart'));
      let index = -1;
      for (let i = 0; i < cart.length; i++) {
        const it: Item = JSON.parse(cart[i]);
        if (it.product.id === id) {
          index = i;
          break;
        }
      }
      if (index === -1) {
        cart.push(JSON.stringify(item));
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        const it: Item = JSON.parse(cart[index]);
        it.quantity += 1;
        cart[index] = JSON.stringify(it);
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
  }
  cartCount(): number {
    this.total = 0;
    const cart = JSON.parse(localStorage.getItem('cart'));
    for (let i = 0; i < cart.length; i++) {
      const item = JSON.parse(cart[i]);
      this.total += item.quantity;
    }
    return this.total;
  }
}
