import { Routes } from '@angular/router';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { LoginComponent } from './components/login/login.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ResultComponent } from './components/result/result.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { adminAuthGuard } from './guards/admin-auth.guard';
import { candidateAuthGuard } from './guards/candidate-auth.guard';
import { CandidateListComponent } from './components/admin-dashboard/candidate-list/candidate-list.component';
import { CandidateFormComponent } from './components/admin-dashboard/candidate-form/candidate-form.component';
import { QuizListComponent } from './components/admin-dashboard/quiz-list/quiz-list.component';
import { QuizFormComponent } from './components/admin-dashboard/quiz-form/quiz-form.component';
import { ResultsComponent } from './components/admin-dashboard/results/results.component';

export const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'quiz', component: QuizComponent, canActivate: [candidateAuthGuard] },
  { path: 'result', component: ResultComponent },
  
  { path: 'admin/login', component: AdminLoginComponent },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [adminAuthGuard],
    children: [
      { path: 'candidate-list', component: CandidateListComponent },
      { path: 'candidate-form', component: CandidateFormComponent },
      { path: 'candidate-form/:id', component: CandidateFormComponent },
      { path: 'quiz-list', component: QuizListComponent },
      { path: 'quiz-form', component: QuizFormComponent },
      { path: 'quiz-form/:id', component: QuizFormComponent },
      {path: 'results', component: ResultsComponent},
      { path: '', redirectTo: 'candidate-list', pathMatch: 'full' }
    ]
  }
];
