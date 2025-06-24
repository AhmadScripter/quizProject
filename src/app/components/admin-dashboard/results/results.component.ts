import { Component } from '@angular/core';
import { CandidateService } from '../../../services/candidate.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results',
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {
  candidates: any[] = [];

  constructor(private candidateService: CandidateService) {}

  ngOnInit() {
    this.loadCandidates();
  }

  loadCandidates() {
    this.candidateService.getCandidates().subscribe(res => {
      this.candidates = res;
    });
  }

  deleteCandidate(id: string) {
    if(confirm("Are you sure you want to delete this candidate?")) {
      this.candidateService.deleteCandidate(id).subscribe(() => {
        this.loadCandidates();
      });
    }
  }
}
