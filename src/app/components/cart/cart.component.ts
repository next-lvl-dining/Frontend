import { Component, OnInit } from '@angular/core';

import { Item } from '../../models/item';
import {CouponService} from '../../services/coupon/coupon.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  items: Item[] = [];
  total = 0;
  korting = 0;
  coupon: string;
  constructor( private couponService: CouponService, private router: Router
  ) { }
  ngOnInit() {
    delete this.coupon;
    this.loadCart();
    this.korting;
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
   this.couponService.valCoupon(couponCode).subscribe(data => {
     console.log('test', JSON.stringify(data));
     this.coupon = couponCode;

     if (data.type.toString() === 'PERCENTAGE') {
       this.korting = Math.round((this.total * (data.rate / 100) * 100)) / 100;
       this.total = this.total - this.korting;
       console.log('percentage');
     } else if (data.type.toString() === 'FLAT') {
       this.korting = data.rate;
       this.total = this.total - this.korting;
       console.log('flat', this.total, this.korting);
     }
   }, error => alert('Coupon code: ' + couponCode + ' is not valid'));
  }

  checkout() {
    if (this.coupon != null) {
      this.couponService.useCoupon(this.coupon).subscribe( data => {
        this.nav('/checkout');
        localStorage.setItem('korting', JSON.stringify(this.korting));
      });
    } else {
      localStorage.setItem('korting', JSON.stringify(this.korting));
      this.nav('/checkout');
    }
  }

  nav(location: string) {
    this.router.navigateByUrl(location);
  }
}
