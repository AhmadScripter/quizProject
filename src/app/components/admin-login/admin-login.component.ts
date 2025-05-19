import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  admin = {
    email: '',
    password: ''
  };

  errorMsg: string = '';

  constructor(private adminService: AdminService, private router: Router) {}

  loginAdmin() {
    this.adminService.login(this.admin).subscribe({
      next: (res: any) => {
        localStorage.setItem('adminToken', res.token); // store JWT
        this.router.navigate(['/admin-dashboard']);
      },
      error: (err) => {
        this.errorMsg = err.error.message || 'Login failed';
      }
    });
  }
}
