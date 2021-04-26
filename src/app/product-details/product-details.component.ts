import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../login/services/login.service';
import { Product } from '../shared/model/product';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styles: [
  ]
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  isNoAuth = false;
  isNotLoggedIn = false;
  alertText = '';
  isVisible = false;
  productList: Product[] = [];
  productsSubscription: Subscription | any;
  getProductData = `{
    "api_key": "ere343ui97yjfr",
     "page": 1  
   }`


  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router, private loginService : LoginService) {
    
  }


  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    
    this.productsSubscription = this.productService.getProductsbyId(this.getProductData, productId)
      .subscribe((res: Product[]) => {
        this.productList = res;
      });



    this.productService.loginStatus.subscribe((status: any) => {
      if (status[1] == "LoggedIn" && status[0] && localStorage.getItem('currentUser')==null) {
        this.isNotLoggedIn = false;
      
      }
      else if (status[1] != "LoggedIn" && status[0]) {
        this.isNotLoggedIn = true;
      }
    });
  }


  addCart() {
    if (localStorage.getItem('currentUser')) {
      
      this.alertText = "Product Added Successfully";
      this.isVisible = true;
      setTimeout(() => this.isVisible = false, 2500);
    }
    else {
      
      this.loginService.openLogin().then(result=>{ }),
      ()=>{}
      
      this.alertText = "Login to add product";
      this.isVisible = true;
      setTimeout(() => this.isVisible = false, 2500)
    }
  }

ngOnDestroy(){
  this.isNotLoggedIn = false;
}

}
