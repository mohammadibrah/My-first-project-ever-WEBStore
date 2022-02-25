import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../products';
import { CartService } from '../cart.service';
import { ProductsService } from '../products.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  activated: boolean = false;
  
  addToCart(product: Product) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }
  cancel(){
    this.editNotActivated();
    location.reload();
  }

  save(){
    if (this.product){
      this.productService.updateProduct(this.product).subscribe(() => this.editNotActivated());
    }
  }
  goBack():void{
    this.location.back();
  }
  editActivated(){
    this.activated = true;
  }

  editNotActivated(){
    this.activated = false;
  }

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductsService,
    private location: Location
  ) {}

  getProduct():void{
    const productId = this.route.snapshot.paramMap.get('productId') as string;
    this.productService.getProduct(productId).subscribe(obProduct => this.product = obProduct);
  }
  ngOnInit() {
    this.getProduct();
  }
}
