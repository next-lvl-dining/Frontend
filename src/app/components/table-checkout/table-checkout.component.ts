import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Product} from "../../models/product";
import {ProductService} from "../../services/product/product.service";
import {PaymentService} from "../../services/payment/payment.service";
import {log} from "util";

declare var Stripe: any;

@Component({
  selector: 'app-table-checkout',
  templateUrl: './table-checkout.component.html',
  styleUrls: ['./table-checkout.component.scss']
})
export class TableCheckoutComponent implements OnInit {

  // todo list of ordered things
  // todo payment
  constructor(private router: Router,
              private productService: ProductService,
              private paymentService: PaymentService) { }

  products: Product[];
  name: string;
  stripe = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
  total: number;

  ngOnInit() {
    this.products = this.productService.getLocalProducts();
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = 0;
    log('calculating price')
    for(let product of this.products){
      this.total += product.price;
      log(product.price + "" + this.total);
    }
    this.total = Math.round( this.total * 100 + Number.EPSILON ) / 100
  }

  navBackToOrder() {
    this.router.navigate(['table/table-order'])
  }

  doPayment() {
    if(this.total == 0){
      this.router.navigate(['table/table-home'])
    } else {
      this.openCheckout(this.total);
    }
  }


  openCheckout(amounts: number) {
    const handler = (window as any).StripeCheckout.configure({
      // public test key to get stripe token
      key: 'pk_test_huGgDHbJfir0H6xdkZ1JI9RJ00wQBU5ZhL',
      locale: 'auto',
      token: token => {
        // gets they credit charge
        this.paymentService.creditCheckout(token.id, amounts.toString()).subscribe(
          data => {
            this.router.navigate(['/table/table-home'])
          },
          error => {
            this.router.navigate(['/table/table-home'])
            console.log(error);
          });
      }
    });
    // opens checkout window with parameters
    handler.open({
      name: 'Next Level Dining',
      description: 'Food for all',
      amount: amounts * 100,
      currency: 'EUR'
    });
  }

  // idealPayment(amounts: number) {
  //   const sourceData = {
  //     type: 'ideal',
  //     amount: amounts * 100,
  //     currency: 'eur',
  //     owner: {
  //       name: this.name
  //     },
  //     redirect: {
  //       return_url: 'http://localhost:4200/table-home',
  //     },
  //   };
  //
  //   this.stripe.createSource(this.idealBank, sourceData).then(result => {
  //     if (result.error) {
  //       console.log(result);
  //       this.authRedirect(result.source);
  //     } else {
  //       console.log('ik ben er');
  //       this.authRedirect(result.source);
  //     }
  //   });
  // }
}
