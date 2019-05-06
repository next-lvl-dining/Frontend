import { Component, OnInit } from '@angular/core';

import { Item } from '../../models/item';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  private items: Item[] = [];
  private total = 0;
  constructor(
  ) { }
  ngOnInit() {
    this.loadCart();
  }

  loadCart(): void {
    this.total = 0;
    this.items = [];
    const cart = JSON.parse(localStorage.getItem('cart'));
    for (const cartItem of cart) {
      const item = JSON.parse(cartItem);
      this.items.push({
        product: item.product,
        quantity: item.quantity
      });
      this.total += item.product.price * item.quantity;
    }
  }

  remove(id: string): void {
    const cart: any = JSON.parse(localStorage.getItem('cart'));
    for (let i = 0; i < cart.length; i++) {
      const item: Item = JSON.parse(cart[i]);
      if (item.product.id === id) {
        cart.splice(i, 1);
        break;
      }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.loadCart();
  }
}
