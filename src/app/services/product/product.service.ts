import { Injectable } from '@angular/core';

import { Product } from '../../models/product';

@Injectable()
export class ProductService {

  private products: Product[];

  constructor() {
    this.products = [
      { id: 'p01', name: 'Braised Leeks with Mozzarella & a Fried Egg', price: 100, photo: 'https://www.foodandwine.com/sites/default/files/201012-ss-dishes-leeks.jpg', desc:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here'," },
      { id: 'p02', name: 'Lamb Salad with Fregola', price: 200, photo: 'https://www.foodandwine.com/sites/default/files/201012-ss-dishes-lamb-salad.jpg' , desc:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."},
      { id: 'p03', name: 'Smoked Pork Jowl with Pickles', price: 300, photo: 'https://www.foodandwine.com/sites/default/files/201012-ss-dishes-smoked-pork.jpg', desc:"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock," }
    ];
  }

  findAll(): Product[] {
    return this.products;
  }

  find(id: string): Product {
    return this.products[this.getSelectedIndex(id)];
  }

  private getSelectedIndex(id: string) {
    for (var i = 0; i < this.products.length; i++) {
      if (this.products[i].id == id) {
        return i;
      }
    }
    return -1;
  }

}
