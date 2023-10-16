import { Component, OnInit } from '@angular/core';
import { ModalController, ModalOptions } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { OtpPage } from '../otp/otp.page';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms'; // Import FormGroup and FormControl


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  phoneNumber: any;
  selectedCountryCode: string = '+1'; // Set a default country code if needed
  Authservices: any;
  form: FormGroup;
  modalctrl: any;

  
  constructor(
    private modalCtrl: ModalController,
     private route: Router, 
     private alertController: AlertController,
     private auth: AuthService
     ) {
      // Initialize the form with form controls
      this.form = new FormGroup({
        phoneNumber: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ]),
      });
      }

     

// async openOTPModal() {
//   if (!this.phoneNumber) {
//     // Display an alert or error message when the phoneNumber field is empty.
//     // You can customize the alert message as needed.
//     const alert = await this.alertController.create({
//       header: 'Error',
//       message: 'Please enter your phone number.',
//       buttons: ['OK'],
//     });
//     await alert.present();
//   }
//    else {
//     // Send OTP using Firebase Authentication.
//     const appVerifier = new this.auth.RecaptchaVerifier('recaptcha-container', {
//       size: 'invisible',
//       callback: (response: any) => {
//         // reCAPTCHA solved, allow sending the code.
//         // You can perform additional logic here if needed.
//       },
//     });

//     try {
//       const confirmationResult = await this.Authservices().signInWithPhoneNumber(
//         `${this.selectedCountryCode}${this.phoneNumber}`,
//         appVerifier
//       );

//     // Proceed with opening the OTP modal if the phoneNumber is provided.
//     const modal = await this.modalController.create({
//       component: OtpPage,
//       componentProps: {
//         phoneNumber: this.phoneNumber,
//         inputClass: 'otp-change'
//       },
//     });
//     return await modal.present();
//   }catch (error) {
//     console.error(error);
//     // Handle any error that occurs during OTP sending.
//     // You can display an error message using an alert.
//   }
// }
// }

async openOTPModal() {
  console.log('Otp modal is called')
  try{
    if(!this.form.valid) {
      console.log('otp working')
      this.form.markAllAsTouched();
    }
    console.log(this.form.value);
    console.log(this.phoneNumber)

    const response = this.auth.openOTPModal('+91' + this.form.value.phoneNumber);
    console.log(response);

    const options: ModalOptions = {
      component: OtpPage,
      componentProps: {
        phone: this.form.value.phoneNumber
      },
      //for iphone 
      //swipeToClose: true
    };
    const modal = this.modalCtrl.create(options);
    //to show the number
    (await modal).present();
    //if want see some data when you dissmiss
    const data: any = (await modal).onWillDismiss();
    console.log(data);
  }catch(e){
    console.log(e);
  }
} 


  ngOnInit() {
  }


}

