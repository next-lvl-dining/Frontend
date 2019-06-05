import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { PaymentService } from 'src/app/services/payment/payment.service';


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
        this.paymentService.creditCheckout(token.id, '100').subscribe(
          data => {
            // update order after that redirect to success delivery page
          },
          error => { console.log(error); });
      }
    });

    handler.open({
      name: 'Next Level Dining',
      description: 'Food for all',
      amount: 10000,
      currency: 'EUR'
    });

  }
}
