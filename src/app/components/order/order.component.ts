import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  private products: Product[];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
   this.products = this.productService.findAll();
  }


}
