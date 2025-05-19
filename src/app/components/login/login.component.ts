import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InstructionDialogComponent } from '../instruction-dialog/instruction-dialog.component';
import { FormsModule } from '@angular/forms';
import { CandidateService } from '../../services/candidate.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  reg: any;
  password: any;

  constructor(private router: Router, private dialog: MatDialog, private candidateService: CandidateService) { }

  onSubmit() {
    if (this.reg && this.password) {
      const credentials = {
        reg: this.reg,
        password: this.password
      };

      this.candidateService.loginCandidate(credentials).subscribe({
        next: (res) => {
          localStorage.setItem('candidateToken', res.token);
          // this.showInstructions();
          this.router.navigate(['/quiz']);
        },
        error: (err) => {
          alert('Login failed: ' + (err.error?.message || 'Unknown error'));
        }
      });

    } else {
      alert("Registration ID and password are required.");
    }
  }

  showInstructions(): void {
    const dialogRef = this.dialog.open(InstructionDialogComponent, {
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/quiz']);
    });
  }
}
