import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ProductService } from '../shared/services/product.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'Login';
  isVisible=false;
  isVerifyOTP = false;
  authSubscription: Subscription | any;
  otpSubscription: Subscription | any;
  isAuth = false;
  doLoginForm: FormGroup | any;
  verifyOtpForm :FormGroup | any;
  responseText='';


  constructor(private productService: ProductService, private router : Router, public loginModal : NgbActiveModal) { }

  ngOnInit(): void {
    this.doLoginForm = new FormGroup({
      api_key: new FormControl('ere343ui97yjfr'),
      mobile_number: new FormControl('', Validators.required)

    });

    this.verifyOtpForm = new FormGroup({
      api_key: new FormControl('ere343ui97yjfr'),
      mobile_number: new FormControl(''),
      otp :new FormControl('', Validators.required)

    });

  }

  sendOTP() {
    this.verifyOtpForm.setValue({
      "api_key":this.doLoginForm.value.api_key,
     "mobile_number":this.doLoginForm.value.mobile_number,
     "otp":''
    });
    
    this.isVerifyOTP = true;
    this.authSubscription = this.productService.doLogin(this.doLoginForm.value)
      .subscribe((res: any) => {
        if(res.code==200 && res.message=="Otp send successfully."){
        this.responseText=res.message;
        this.isVisible = true;
      setTimeout(() => this.isVisible = false, 5000)
      }
     
      });
  }

  verifyOTP() {
  
    this.otpSubscription = this.productService.verifyOtp(this.verifyOtpForm.value)
     .subscribe((res: any) => {
     if(res.code==200){
     this.responseText=res.message;
     this.isVisible = true;
      setTimeout(() => this.isVisible = false, 5000)
     this.productService.updateLogin(this.verifyOtpForm.value.mobile_number,"LoggedIn");
     localStorage.setItem('currentUser', this.verifyOtpForm.value.mobile_number);
     localStorage.setItem('LoggedIn',"true");
     this.loginModal.close();
    }
    else {
    this.responseText=res.message;
    this.isVisible = true;
      setTimeout(() => this.isVisible = false, 5000)
    }
    });

  }

  reEnter(){
    this.isVerifyOTP = false;
    this.isVisible = false;
  }

}
