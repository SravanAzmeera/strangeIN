import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { response } from 'express';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

// Define properties for user input data
  name: any;
  email: any;
  dateofBirth: any;
  gender: any;
  relationship: any;  // You mentioned the relationship property, add it here if needed
  createdUser: any;  // to sdtore the created user data
  // users: any[] = [];
  user: any;
  createdUserId: any;

  // Inject HttpClient into the component
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    // Initialize the user ID you want to retrieve
    let docId = this.createdUserId
    this.getUserData(docId);
  }

  // Function to submit user data to the API
submitForm() {
  const userData = {
    name: this.name,
    email: this.email,
    dateofBirth: this.dateofBirth, // Creating a Date object from individual fields
    gender: this.gender,
  };

  // Make a POST request to the API to create a new user
  this.http.post('http://localhost:3000/strangeIn/user', userData).subscribe(
    (response) => {
    console.log('User created successfully', response);
    this.createdUser = response;
    // Optionally, retrieve the user data after creation
    console.log(this.createdUser.createdItem._id)
    this.getUserData(this.createdUser.createdItem._id);
  },
  (error) => {
    console.log(error);
  }
  )

}

getUserData(docId: string) {
  // Make a GET request to retrieve user data
  this.http.get('http://localhost:3000/strangeIn/user/'+docId).subscribe(
    (response: any) => {
      console.log('User data retrieved successfully', response);
      // Update the user data property with the retrieved data
      this.user = response;
    },
    (error) => {
      console.log(error);
    }
  );
}

addRelationship() {

}

addPhoto() {

}

addVideo() {
  
}

selectGender(gender: any) {
  // Implement your selectGender logic here
  this.gender = gender; // Set the selected gender
}

// selectDOB(dateofbirth: any){
//   this.dateofbirth = dateofbirth

// }

}
