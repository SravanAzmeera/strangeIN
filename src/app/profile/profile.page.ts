import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular'; // Import AlertController


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profile: any; // Array to store user profiles
  phoneNumber: any;
  UserProfile: any;
  isLoggedIn: boolean = true; // Set this based on your authentication state

  


  constructor(
    private http: HttpClient,
    private route: Router,
    private router: ActivatedRoute,
    private auth : AuthService,
    private alertController: AlertController
  ) { 
    this.phoneNumber = localStorage.getItem('phoneNumber');
    console.log(this.phoneNumber);
    this.isLoggedIn = this.checkAuthenticationStatus();

  }

  ngOnInit() {
    // Check authentication status and user data when the page loads
    if (!this.isLoggedIn || !this.auth.hasProfileData()) {
      this.showLoginAlert();
    } else {
      this.getProfiles();
    }
  }

  getProfiles() {
    console.log(this.phoneNumber);
    this.http.get('https://relieved-red-quail.cyclic.app/Signup/+91'+this.phoneNumber).subscribe(
      (data: any) => {
        console.log(data);
        this.profile = data; // Store fetched profiles in the array
      },
      (error) => {
        console.error('Error fetching profiles:', error);
        this.showLoginAlert();
      }
    );
  } 

  home(){
   this.route.navigate(['welcom']);
  } 

  checkAuthenticationStatus(): boolean {
    // Use your AuthService to check authentication status
    return this.auth.isAuthenticated();
  }

  async logout() {
    // Perform logout actions using your AuthService
    this.auth.logout();
    // Navigate to the login page or any other desired page
    // this.route.navigate(['./signup']); // Adjust the route accordingly
  }

  async showLoginAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Please download the app and sign-in.',
      buttons: [
        {
        text: 'Okay',
        handler: () => {
          console.log('Confirm Okay');
           //you can write your code or redirection 
           // sample redirection code 
           this.route.navigate(['/welcom'])
        }
        }
      ],

    });
    await alert.present();
  
  }

  hasProfileData(): boolean {
    console.log(this.phoneNumber);
    return !!this.phoneNumber;
    console.log(this.phoneNumber);

  }

}
