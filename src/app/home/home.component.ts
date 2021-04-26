import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../shared/model/product';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit, OnDestroy {

  
  productList: Product[] = [];
  productsSubscription: Subscription | any;
  getProductData =`{
    "api_key": "ere343ui97yjfr",
     "page": 1  
   }`

  constructor(private productService: ProductService) {
  
  }

  ngOnInit(): void {
    
 this.productsSubscription = this.productService.getProducts(this.getProductData)
 .subscribe((res: Product[]) =>{
    this.productList = res;
  });
   }

ngOnDestroy(): void {
 this.productsSubscription.unsubscribe();
 if (this.productList && this.productList.length > 0) {
 this.productList.length = 0;
 }
}

}
