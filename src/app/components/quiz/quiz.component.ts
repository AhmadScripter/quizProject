import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { QuizService } from '../../services/quiz.service';

interface QuizQuestion {
  _id: string;
  questionText: string;
  options: string[];
  correctIndex: number;
  selectedIndex?: number;
  answered?: boolean;
}

@Component({
  selector: 'app-quiz',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})

export class QuizComponent implements OnInit, OnDestroy{
  
  candidateToken: string | null = '';
  questions: QuizQuestion[] = [];
  currentQuestionIndex: number = 0;
  showCorrectAnswer: boolean = false;
  timer: number = 0;
  timerInterval: any;

  constructor(private router: Router, private quizService: QuizService){}

  ngOnInit(): void {
    this.candidateToken = localStorage.getItem('candidateToken');
    if (!this.candidateToken) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadQuestions();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  loadQuestions(): void {
    this.quizService.getQuestions().subscribe({
      next: (data) => {
        this.questions = data.map((q: QuizQuestion) => ({ ...q, answered: false }));
        this.timer = 60 * this.questions.length;
        this.startTimer();
      },
      error: (err) => {
        console.error('Failed to load questions', err);
      }
    });    
  }

  startTimer(): void {
    this.clearTimer();
    this.timerInterval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.submitQuiz();
      }
    }, 1000);
  }

  clearTimer(): void {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }

  selectOption(optionIndex: number): void {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    if (currentQuestion.answered) return;

    currentQuestion.selectedIndex = optionIndex;
    currentQuestion.answered = true;
    this.showCorrectAnswer = true;
    setTimeout(() => this.nextQuestion(), 2000);
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.showCorrectAnswer = false;
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.showCorrectAnswer = false;
    }
  }

  isTimeRunningOut(): boolean {
    return this.timer < 60;
  }

  get currentQuestion(): any {
    return this.questions[this.currentQuestionIndex];
  }

  getOptionClass(optionIndex: number): string {
    if (!this.showCorrectAnswer) return 'option bg';
    if (optionIndex === this.currentQuestion.correctIndex) return 'option bg correct';
    if (optionIndex === this.currentQuestion.selectedIndex) return 'option bg incorrect';
    return 'option bg disabled';
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  submitQuiz(): void {
    const attemptedQuestions = this.questions.filter(q => q.selectedIndex !== undefined).length;
  
    const payload = {
      reg: localStorage.getItem('reg'),
      answers: this.questions.map(q => ({
        quizId: q._id,
        answer: q.selectedIndex !== undefined ? q.options[q.selectedIndex] : null
      }))
    };
  
    this.quizService.submitQuiz(payload).subscribe({
      next: (res) => {
        const correctAnswers = res.score;
        this.router.navigate(['/result'], {
          queryParams: {
            total: this.questions.length,
            attempted: attemptedQuestions,
            correct: correctAnswers
          }
        });
      },
      error: err => console.error('Error submitting quiz', err)
    });
  }
}
