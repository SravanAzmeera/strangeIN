import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcom',
  templateUrl: './welcom.page.html',
  styleUrls: ['./welcom.page.scss'],
})
export class WelcomPage implements OnInit {

  constructor(
    private route: Router
  ) { }

  ngOnInit() {
  }

start(){
 this.route.navigate(['/signup'])
}

}
