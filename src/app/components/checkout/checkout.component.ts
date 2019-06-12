import {Component, NgZone, OnInit} from '@angular/core';
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
  stripe = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
  idealBank: any;
  sId: any;
  client: any;
  source: any;

  constructor(private formBuilder: FormBuilder, private paymentService: PaymentService, private ngZone: NgZone) {
    this.createForm();
  }

  ngOnInit() {
    this.idealBanks();
    //  this.pollSourceStatus();
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
          error => {
            console.log(error);
          });
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

  idealPayment() {

    const sourceData = {
      type: 'ideal',
      amount: 10000,
      currency: 'eur',
      owner: {
        name: 'Richard',
      },
      redirect: {
        return_url: 'http://localhost:4200/checkout',
      },
    };
    this.stripe.createSource(this.idealBank, sourceData).then(result => {
      if (result.error) {
        console.log('error');
      } else {
        console.log('ik ben er');
        this.authRedirect(result.source);
      }
    });
  }

  authRedirect(source: any) {
    document.location.href = source.redirect.url;
  }

}
