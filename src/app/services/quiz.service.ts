import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'http://localhost:3000/api/quiz';

  constructor(private http: HttpClient) { }

  private authHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('adminToken');
    return { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) };
  }

  // Get all quiz questions
  getQuestions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }

  // Submit quiz answers
  submitQuiz(answers: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/submit`, answers, this.authHeaders());
  }

  // Get result for a specific user
  getResult(candidateId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/result/${candidateId}`);
  }

  //for admin use
  addQuestion(questionData:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/add`, questionData, this.authHeaders())
  }
  updateQuestion(id: string, questionData:any):Observable<any>{
    return this.http.put(`${this.apiUrl}/update/${id}`, questionData, this.authHeaders())
  }
  deleteQuestion(id: string):Observable<any>{
    return this.http.delete(`${this.apiUrl}/delete/${id}`, this.authHeaders())
  }

}
