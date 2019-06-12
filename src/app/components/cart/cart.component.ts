import { Component, OnInit } from '@angular/core';

import { Item } from '../../models/item';
import {CouponService} from '../../services/coupon/coupon.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  private items: Item[] = [];
  private total = 0;
  constructor( private couponService: CouponService
  ) { }
  ngOnInit() {
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
      }
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

  validateCoupon(couponCode: string) {
    this.couponService.getCoupon(couponCode).subscribe(
      data => {
        if (data.type === 0) {
          this.total = this.total - (this.total * (data.rate / 100));
        } else if (data.type === 1) {
            this.total = this.total - data.rate;
        }
        this.couponService.useCoupon(data.code).subscribe(d => {});
      }
    );
  }
}
