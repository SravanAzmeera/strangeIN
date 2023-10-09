import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

    otpDigits: string[] = ['', '', '', '', '', '']; // Array to store OTP digits


  constructor(private modalController: ModalController) {}

  ngOnInit() {
  }

// Dismiss the modal
dismissModal() {
  this.modalController.dismiss();
}

// Verify the OTP
verifyOTP() {
  const otp = this.otpDigits.join(''); // Combine OTP digits
  // Implement OTP verification logic here
}

// Resend OTP
resendOTP() {
  // Implement OTP resend logic here
}

// Change Password
changePassword() {
  // Implement change password logic here
}

}
