import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/services/login.service';
import { ProductService } from '../../services/product.service';
// import { NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {
isLogedIn:boolean=true;
user:String | null='';
isLoggingIn=false;


  constructor(private productService : ProductService, private router:Router, private loginService : LoginService) { 

    this.isLoggingIn=false;

  }

  ngOnInit(): void {
    this.isLoggingIn=false;
    this.productService.loginStatus.subscribe ( (status:any) => {     
      this.user=status[0];
      if(status[1]=="LoggedIn" && status[0]){
        this.isLoggingIn=false;   
      }

    });
    
  }

  onLogoClick(){
    this.isLoggingIn=false;
  }

  isLoggedIn(){
    return localStorage.getItem('currentUser');
  }

  openLogin(){
    this.isLoggingIn=true;    
    this.loginService.openLogin().then(result=>{    }),
    ()=>{}
   }

   onLogout() {
    localStorage.clear();
    this.isLoggingIn=false;
    this.user=localStorage.getItem('currentUser');
    this.router.navigate(['']);
}

   ngOnDestroy(){
   }

}
