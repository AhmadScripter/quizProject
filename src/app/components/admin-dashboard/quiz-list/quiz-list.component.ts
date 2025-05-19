import { Component } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './quiz-list.component.html',
  styleUrl: './quiz-list.component.css'
})
export class QuizListComponent {
  quizzes: any[] = [];

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.loadQuizzes();
  }

  loadQuizzes() {
    this.quizService.getQuestions().subscribe(res => {
      this.quizzes = res;
    });
  }

  deleteQuiz(id: string) {
    if(confirm("Are you sure to delete this quiz question?")) {
      this.quizService.deleteQuestion(id).subscribe(() => {
        this.loadQuizzes();
      });
    }
  }

}
