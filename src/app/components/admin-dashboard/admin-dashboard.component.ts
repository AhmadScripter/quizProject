import { Component } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [FormsModule, CommonModule, RouterLink, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  
  constructor(private router: Router){}

  logout(){
    localStorage.removeItem('adminToken')
    this.router.navigate(['/admin-login']);
  }
}
