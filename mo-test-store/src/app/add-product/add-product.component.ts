import { Component, OnInit } from '@angular/core';
import { Product } from '../products';
import { ProductsService } from '../products.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product : Product = {
    _id: '',
    name: '',
    price: 0,
    description: '',
    imgUrl: ''
  };

  constructor(
    private productService: ProductsService,
    private location: Location
  ) { }

  cancel(){
    location.reload();
  }

  save(){
    if (this.product.name){
      this.productService.addProduct(this.product).subscribe(() => this.goBack());
    } else window.alert('You need to add Product name at least!');
  }
  goBack():void{
    this.location.back();
  }

  ngOnInit(): void {
  }

}
