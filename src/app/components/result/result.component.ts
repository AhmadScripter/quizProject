import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  imports: [],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {
  totalQuestions: number = 0;
  attemptedQuestions: number = 0;
  correctAnswers: number = 0;

  recommed: string = '';
  heading: string = '';

  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    // Prevent back button
    history.pushState(null, '', location.href);
    window.onpopstate = () => {
      history.pushState(null, '', location.href);
    };
    
    this.route.queryParams.subscribe(params => {
      this.totalQuestions = +params['total'];
      this.attemptedQuestions = +params['attempted'];
      this.correctAnswers = +params['correct'];

      this.recommed = (this.correctAnswers / this.totalQuestions) >= 0.33 ? "Pass" : "Fail";
      this.heading = (this.correctAnswers / this.totalQuestions) >= 0.33 ? "Congratulations" : "Alas";
    })
  }
}
