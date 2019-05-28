import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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
}
