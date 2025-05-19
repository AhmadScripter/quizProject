import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private apiUrl = 'http://localhost:3000/api/candidate';

  constructor(private http: HttpClient) { }

  private authHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('adminToken');
    return { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) };
  }

  registerCandidate(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data, this.authHeaders());
  }

  getCandidate(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, this.authHeaders());
  }

  getCandidates(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  updateCandidate(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, data, this.authHeaders());
  }

  deleteCandidate(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${id}`, this.authHeaders());
  }

  loginCandidate(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
}
