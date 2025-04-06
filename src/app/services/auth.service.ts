// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
    aud: string;
    sub: string;
    exp: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(tenantId: string, email: string, password: string): Observable<any> {
    console.log(tenantId);
    return this.http.post('https://authenticator-d2d5hcajhec6h0eg.southeastasia-01.azurewebsites.net/api/Identity/token', {
        tenantId,
        email,
      password
    });
  }

  getUserToken(): Observable<any> {
    const userId = this.getUserId();
    console.log(userId);
    return this.http.post('https://web-api-gwgpaxbweaa6efdn.southeastasia-01.azurewebsites.net/api/chat/token/' + userId,{});
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getTenantId(): string | null {
    return localStorage.getItem('tenantId');
  }

  getUserId(): string {
    const token = this.getToken();
    if (!token) return '';
  
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.sub;
    } catch (e) {
      console.error('Invalid token:', e);
      return '';
    }
  }
}
