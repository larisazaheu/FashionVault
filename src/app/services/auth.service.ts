import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7167/api/auth';

  constructor(private http: HttpClient) { }

  register(userData: any) {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
}
