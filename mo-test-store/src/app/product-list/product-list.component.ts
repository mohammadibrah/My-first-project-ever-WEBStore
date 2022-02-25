import { Component, OnInit } from '@angular/core';
import { Product } from '../products';
import { CartService } from '../cart.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit{
  products : Product[] = [];
  mouseIsOver : boolean = false;
  getProducts():void {
    this.prodctService.getProducts().subscribe(obProducts => this.products = obProducts);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }

  share() {
    window.alert('The product has been shared!');
  }
  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }
  constructor(
    private cartService: CartService, private prodctService: ProductsService
  ) {}

  ngOnInit(): void {
      this.getProducts();
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
