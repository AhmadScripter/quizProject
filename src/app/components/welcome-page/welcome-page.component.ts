import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent {
  constructor(private router: Router) {}

  moveToLoginPage(){
    this.router.navigateByUrl('login');
  }
}
