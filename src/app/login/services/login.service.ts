import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private modal : NgbModal) { }

  openLogin(): Promise<any>{
    let modelRef=this.modal.open(LoginComponent,{size:'md', backdrop:'static'});
    return modelRef.result;
  }
}
