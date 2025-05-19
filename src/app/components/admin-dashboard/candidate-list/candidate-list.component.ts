import { Component } from '@angular/core';
import { CandidateService } from '../../../services/candidate.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidate-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.css'
})
export class CandidateListComponent {
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
