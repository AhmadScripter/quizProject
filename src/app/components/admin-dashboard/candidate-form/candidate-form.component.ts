import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../../../services/candidate.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidate-form',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './candidate-form.component.html',
  styleUrl: './candidate-form.component.css'
})
export class CandidateFormComponent implements OnInit{
  candidate: any = {
    cnic: '',
    name: '',
    batch: '',
    reg: '',
    password: ''
  };

  id: string | null = null;

  constructor(
    private candidateService: CandidateService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.candidateService.getCandidate(this.id).subscribe(data => {
        console.log('Fetched candidate:', data);  // ✅ Debug
        this.candidate = data;
      });
    }
  }
  
  saveCandidate() {
    if(this.id) {
      this.candidateService.updateCandidate(this.id, this.candidate).subscribe(() => {
        this.router.navigate(['/admin-dashboard/candidate-list']);
      });
    } else {
      this.candidateService.registerCandidate(this.candidate).subscribe(() => {
        this.router.navigate(['/admin-dashboard/candidate-list']);
      });
    }
  }

}
