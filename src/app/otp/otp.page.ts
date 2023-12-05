import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  

    // otpDigits: string[] = ['', '', '', '', '', ''];  // Array to store OTP digits
    otp: any;
    isLoading = false;
    config = {
      length: 6,
      allowNumberOnly: true,
      inputClass: 'otp-input-style'
    };
  form: any;
  phoneNumber: any;
  response: any;

  constructor(
    private modalController: ModalController,
    private auth: AuthService,
    private router: Router,
    public loadingctrl: LoadingController,
    public toastctrl: ToastController,
    private route: ActivatedRoute, // Import ActivatedRoute


    ) {
      this.phoneNumber = localStorage.getItem('phoneNumber');
      console.log(this.phoneNumber);
    }

  ngOnInit() {
  }

  async showLoader(msg: any) {
    this.isLoading = true;
    const loading = await this.loadingctrl.create({
      message: msg,
      spinner: 'bubbles',
    });
    await loading.present();
    return loading;
  }


  async hideLoader(loading: any){
    if(this.isLoading) this.isLoading = false;
    return this.loadingctrl.dismiss()
    .then(() => console.log('dismissed'))
    .catch(e => console.log(e));
  }


  joinOtpArray(otp: any){
    if(!otp || otp == '') return 0;
    const otpNew = otp.join('');
    return otpNew;
  }

  onOtpChange(event: any) {
    this.otp = event;
    console.log(this.otp);
  } 

// Dismiss the modal
dismissModal() {
  this.modalController.dismiss();
}

// Verify the OTP
async verifyOTP() {
  try{
    const isVerified = await this.auth.verifyOtp(this.otp);
    console.log(this.otp)
    console.log(isVerified);

  if (isVerified) {
    this.router.navigate(['./profile']);
    this.dismissModal();
  } else {
      // Handle the case where OTP verification failed
      const toast = await this.toastctrl.create({
        message: 'OTP verification failed. Please try again.',
        duration: 3000,
      });
      toast.present();
    }

  } catch(e) {
    console.log(e);
  }
  // const otp = this.otpDigits.join(''); // Combine OTP digits
  // Implement OTP verification logic here
}

// Resend OTP
 // Resend OTP
 async resendOTP() {
  try {
    const loading = await this.showLoader('Resending OTP...');
    const response = await this.auth.openOTPModal('+91' + this.phoneNumber);
    await this.hideLoader(loading);
    console.log(response);
  } catch (e) {
    await this.hideLoader(null);
    console.log(e);
    const toast = await this.toastctrl.create({
      message: 'Error resending OTP. Please try again.',
      duration: 3000,
      color: 'danger',
    });
    toast.present();
  }
}

// Change Password
changePassword() {
  // Implement change password logic here
}


}