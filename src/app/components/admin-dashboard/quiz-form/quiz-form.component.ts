import { Component } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-form',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './quiz-form.component.html',
  styleUrl: './quiz-form.component.css'
})
export class QuizFormComponent {
  quiz: any = {
    question: '',
    options: ['', '', '', ''],
    answer: ''
  };
  trackByIndex(index: number, item: any): number {
    return index;
  }
  
  id: string | null = null;

  constructor(
    private quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
      this.quizService.getQuestions().subscribe(quizzes => {
        const quizItem = quizzes.find((q: any) => q._id === this.id);
        if (quizItem) {
          this.quiz = quizItem;
        }
      });
    }
  }

  saveQuiz() {
    if(this.id) {
      this.quizService.updateQuestion(this.id, this.quiz).subscribe(() => {
        this.router.navigate(['/admin-dashboard/quiz-list']);
      });
    } else {
      this.quizService.addQuestion(this.quiz).subscribe(() => {
        this.router.navigate(['/admin-dashboard/quiz-list']);
      });
    }
  }

}
