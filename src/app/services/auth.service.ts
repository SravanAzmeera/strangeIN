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
     console.log(otp);
     console.log(result);
     const user= result?.user;
     console.log(user);

     // Check if the OTP verification was successful (user is not null)
     return user !== null;
    }catch(e){
      throw(e);  // You can handle this error further up the call stack.
    }
}

isAuthenticated(): boolean {
  // Implement your authentication check logic here
  // Return true if authenticated, false otherwise
  // For example, you can check if the user is signed in or if a token exists
  return !!this.fireAuth.currentUser; // This example assumes the user is authenticated if there is a current user
}

logout() {
  // Perform logout actions (e.g., clear authentication token, reset user state)
  // Example: this.fireAuth.signOut(); // Use the appropriate method for your authentication system
}

}
