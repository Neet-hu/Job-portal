import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Fixed backend path including api folder
  api = 'http://localhost/job-portal-backend/job-portal/api'; 

  constructor(private http: HttpClient) {}

  register(data: { username: string; password: string; user_type: string }): Observable<any> {
    return this.http.post(`${this.api}/register.php`, data);
  }

  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.api}/login.php`, data);
  }
}
