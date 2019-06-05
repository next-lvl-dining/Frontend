import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { PaymentService } from 'src/app/services/payment/payment.service';


declare var Stripe: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private paymentService: PaymentService) {
    this.createForm();
  }

  ngOnInit() {
    this.idealBanks();
  }

  createForm() {
    this.checkoutForm = this.formBuilder.group({
      address: ['', Validators.required],
      zipcode: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required],
      city: ['', Validators.required],
      phonenumber: ['', Validators.required]
    });
  }

  openCheckout() {
    const handler = (window as any).StripeCheckout.configure({
      // public test key to get stripe token
      key: 'pk_test_huGgDHbJfir0H6xdkZ1JI9RJ00wQBU5ZhL',
      locale: 'auto',
      token: token => {
        // gets they credit charge
        this.paymentService.creditCheckout(token.id, '100').subscribe(
          data => {
            // update order after that redirect to success delivery page
          },
          error => { console.log(error); });
      }
    });
    // opens checkout window with parameters
    handler.open({
      name: 'Next Level Dining',
      description: 'Food for all',
      amount: 10000,
      currency: 'EUR'
    });
  }

  idealBanks() {

    // stripe client with public test key
    const stripe = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
    // calling elements
    const elements = stripe.elements();

    // needs to  moved to sccs
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
    const idealBank = elements.create('idealBank', {style});

    // add instance to a div
    idealBank.mount('#ideal-bank-element');
  }
}
