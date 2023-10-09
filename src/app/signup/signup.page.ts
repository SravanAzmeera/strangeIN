import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OtpPage } from '../otp/otp.page';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  phoneNumber: string = '';
  selectedCountryCode: string = '+1'; // Set a default country code if needed

  
  constructor(private modalController: ModalController) { }

  async openOTPModal() {
    const modal = await this.modalController.create({
      component: OtpPage,
      componentProps: {
        phoneNumber: this.phoneNumber,
      },
    });
    return await modal.present();
  }

  ngOnInit() {
  }

   // Implement your OTP verification logic here
   verifyOTP() {
    // Validate OTP and perform actions accordingly
  }

  // Implement OTP resend logic here
  resendOTP() {
    // Resend OTP logic
  }

  // Implement change password logic here
  changePassword() {
    // Change password logic
  }

}
