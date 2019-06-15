import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product/product.service';
import {Item} from '../../models/item';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

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
    private productService: ProductService, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAll().subscribe(data => {
      this.products = data;
      });
  }
  add(id: string) {
    const item: Item = {
      product: this.find(id),
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
    for (const cartItem of cart) {
      const item = JSON.parse(cartItem);
      this.total += item.quantity;
    }
    return this.total;
  }
  find(id: string): Product {
    return this.products[this.getSelectedIndex(id)];
  }

  private getSelectedIndex(id: string) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        return i;
      }
    }
    return -1;
  }
}
