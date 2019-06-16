import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {PaymentService } from 'src/app/services/payment/payment.service';
import {OrderService} from '../../services/order/order.service';
import {DeliveryOrder} from '../../models/deliveryorder';
import {OrderType} from '../../util/ordertype';
import {OrderStatus} from '../../models/orderstatus';
import {Address} from '../../models/address';
import {Router} from '@angular/router';



declare var Stripe: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  stripe = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
  idealBank: any;
  paymentMethod: any;
  address: Address;
  total: any;

  constructor(private formBuilder: FormBuilder,
              private paymentService: PaymentService,
              private orderService: OrderService,
              private router: Router) {
   this.createForm();
  }

  ngOnInit() {
    this.total = localStorage.getItem('total');
    console.log(this.total);
    this.idealBanks();
  }

  createForm() {
    this.checkoutForm = this.formBuilder.group({
      address: ['', Validators.required],
      zipcode: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required],
      city: ['', Validators.required],
      phonenumber: ['', Validators.required],
      nr: ['', Validators.required]
    });
  }

  testOrderButton() {
    const orderStatus: OrderStatus = {status: 'Paid'};
    const address: Address = {
      street: this.checkoutForm.value.address,
      streetNr: this.checkoutForm.value.nr,
      city: this.checkoutForm.value.city,
      zipcode: this.checkoutForm.value.zipcode
    };

    const deliverOrder: DeliveryOrder = {
      userId: localStorage.getItem('id'),
      type: OrderType.DELIVERY,
      totalPrice: this.total,
      totalVat: 9,
      paymentId: '',
      status: orderStatus,
      couponId: '',
      // for delivery
      address
    };
    console.log(JSON.stringify(deliverOrder.totalPrice));
    if (this.paymentMethod != null) {
      if (this.paymentMethod === 'creditCard') {
        console.log('test');
        this.orderService.createAddress(address).subscribe(data => {
          console.log(data.id);
          this.orderService.createDeliveryOrder(
            deliverOrder.userId,
            deliverOrder.totalPrice,
            deliverOrder.totalVat,
            deliverOrder.status,
            data
          ).subscribe(d => {
            this.openCheckout(deliverOrder.totalPrice);
            console.log('success -> creditcard ' + d.id);
            localStorage.setItem('orderid', d.id);
          });
        });
      } else if (this.paymentMethod === 'iDeal') {
        this.orderService.createAddress(address).subscribe(data => {
          this.orderService.createDeliveryOrder(
            deliverOrder.userId,
            deliverOrder.totalPrice,
            deliverOrder.totalVat,
            deliverOrder.status,
            data
          ).subscribe(d => {
            this.idealPayment(deliverOrder.totalPrice);
            console.log('success -> iDeal')
            localStorage.setItem('orderid', d.id);
          });
        });
        console.log('iDeal');
      }
    } else {
      alert('Choose a payment method.');
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

            this.nav('paid');
          },
          error => {
            this.nav('paid');
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

  idealBanks() {

    // stripe client with public test key
    // calling elements
    const elements = this.stripe.elements();

    // needs to  moved to scss
    const style = {
      base: {
        padding: '10px 12px',
        color: '#32325d',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        },
      },
      invalid: {
        color: '#fa755a',
      }
    };

    // creating bank
    this.idealBank = elements.create('idealBank', {style});

    // add instance to a div
    this.idealBank.mount('#ideal-bank-element');
  }

  idealPayment(amounts: number) {

    const sourceData = {
      type: 'ideal',
      amount: amounts * 100,
      currency: 'eur',
      owner: {
        name: this.checkoutForm.value.name,
      },
      redirect: {
        return_url: 'http://localhost:4200/paid',
      },
    };
    this.stripe.createSource(this.idealBank, sourceData).then(result => {
      if (result.error) {
        console.log(result);
        this.authRedirect(result.source);
      } else {
        console.log('ik ben er');
        this.authRedirect(result.source);
      }
    });
  }

  authRedirect(source: any) {
    document.location.href = source.redirect.url;
  }

  nav(location: string) {
    this.router.navigateByUrl(location);
  }

}
