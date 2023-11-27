import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profile: any; // Array to store user profiles
  phoneNumber: any;
  UserProfile: any;


  constructor(
    private http: HttpClient,
    private route: Router,
    private router: ActivatedRoute
  ) { 
    this.phoneNumber = localStorage.getItem('phoneNumber');
    console.log(this.phoneNumber);
  }

  ngOnInit() {
    this.getProfiles(); // Fetch profiles when the page loads 9502422980
  }

  getProfiles() {
    console.log(this.phoneNumber);
    this.http.get('http://localhost:3000/Signup/+91'+this.phoneNumber).subscribe(
      (data: any) => {
        console.log(data);
        this.profile = data; // Store fetched profiles in the array
      },
      (error) => {
        console.error('Error fetching profiles:', error);
      }
    );
  } 

  home(){
   this.route.navigate(['welcom']);
  }

}
