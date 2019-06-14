import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';

@Component({
  selector: 'app-paid',
  templateUrl: './paid.component.html',
  styleUrls: ['./paid.component.scss']
})
export class PaidComponent implements OnInit {

  items: Item[] = [];
  total: number;
  constructor() { }

  ngOnInit() {
    this.total = parseInt(localStorage.getItem('total'), 2 );
    this.loadCart();
  }

  loadCart(): void {
    this.total = 0;
    this.items = [];
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart != null) {
      for (const cartItem of cart) {
        const item = JSON.parse(cartItem);
        this.items.push({
          product: item.product,
          quantity: item.quantity
        });
        this.total += item.product.price * item.quantity;
        localStorage.setItem('total', JSON.stringify(this.total));
      }
    }
  }

}
