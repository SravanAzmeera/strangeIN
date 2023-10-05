import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  phoneNumber: string = '';
  selectedCountryCode: string = '+1'; // Set a default country code if needed

  constructor() { }

  ngOnInit() {
  }

}
