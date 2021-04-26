import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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


  constructor(private productService : ProductService, private router:Router) { 

    this.isLoggingIn=false;

  }

  ngOnInit(): void {
    this.isLoggingIn=false;
    this.productService.loginStatus.subscribe ( (status:any) => {     
      this.user=status[0];
      if(status[1]=="LoggedIn" && status[0]){
        this.isLoggingIn=false;   
      }
      // else{
      //   this.isLoggingIn=true; 
      // }
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
    
   }

   onLogout() {
    localStorage.clear();
    this.isLoggingIn=false;
    this.user=localStorage.getItem('currentUser');
    this.router.navigate(['']);
}

   ngOnDestroy(){
    // this.isLoggingIn=false;
   }

  // openModal() {
  //   const modalRef = this.modalService.open(FormModalComponent);
  //   modalRef.componentInstance.id = 10;
  //   modalRef.result.then((result) => {
  //     console.log(result);
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }
}
