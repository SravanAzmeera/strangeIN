import { Injectable } from '@angular/core';
import { Auth, RecaptchaVerifier, signInWithPhoneNumber } from '@angular/fire/auth';
// import firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  
  // confirmationResult: firebase.auth.ConfirmationResult;


  appVerifier: any;
  confirmationResult: any;
  RecaptchaVerifier: any;
  signInWithPhoneNumber: any;

  constructor(private fireAuth: Auth) { }


  recaptcha() {
    this.appVerifier = new RecaptchaVerifier('openOTPModal-button', {
      size: 'invisible',
      callback: (response: any) => {
        console.log(response);
      },
      'expired-callback': () => {}
    }, this.fireAuth);
  }


  async openOTPModal(phoneNumber: any){
     console.log(phoneNumber)
    try{
      if (!this.appVerifier) this.recaptcha();
      const confirmationResult = await signInWithPhoneNumber(this.fireAuth, phoneNumber, this.appVerifier);
      this.confirmationResult= confirmationResult;
      return confirmationResult;
    }catch(e){
      throw(e);
    }
    
  }


  async verifyOtp(otp: any){
    try{
      if (!this.appVerifier) this.recaptcha();
     const result = await this.confirmationResult.confirm(otp);
     console.log(result);
     const user= result?.user;
     console.log(user);
    }catch(e){
      throw(e);
    }
}
}
