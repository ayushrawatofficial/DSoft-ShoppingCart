import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
isLogin:any='';
private currentStatus = new BehaviorSubject(this.isLogin);
 loginStatus: Observable<boolean> = this.currentStatus.asObservable();

  constructor(private http: HttpClient) { }


  updateLogin( login: any, status:any ): void {
 this.loginStatus.pipe( take(1)).subscribe( val => {
   const latestStatus = [login,status];
   this.currentStatus.next(latestStatus);
 });
  }

  doLogin(data: any): Observable<Product[]>{
    
    return this.http.post('http://101.53.138.14/restApi/api.php/sendRegistrationOtp', data)
      .pipe(map( (res: any) => { 
        return res;
      }));
    
  }

  verifyOtp(data: any): Observable<Product[]>{
        return this.http.post('http://101.53.138.14/restApi/api.php/verifyRegistrationOtp', data)
      .pipe(map( (res: any) => { 
        return res;
      }));
    
  }

  getProducts(data: any): Observable<Product[]>{
    
    return this.http.post('http://101.53.138.14/restApi/api.php/getAllProductList', data)
      .pipe(map( (res: any) => { 
        return res.data.product;
      }));
  }

  
  getProductsbyId(data: any,productId:any): Observable<Product[]>{

    return this.http.post('http://101.53.138.14/restApi/api.php/getAllProductList', data)
      .pipe(map( (products: any) => { 
        return products.data.product.filter((product:any) => product.id == productId)
      }));

    }

}
