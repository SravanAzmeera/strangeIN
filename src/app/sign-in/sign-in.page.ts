import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  name: any;
  email: any;
  dobDay: any;
  dobMonth: any;
  dobYear: any;
  gender: any;
  relationship: any;

  constructor() { }

  ngOnInit() {
  }

submitForm() {

}

addRelationship() {
  
}

}
