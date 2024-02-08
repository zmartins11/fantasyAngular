import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { authResponse } from '../model/authResponse';
import { User } from '../model/user';
import { environment } from '../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const baseApi = environment.apiSpringUrl;
const AUTH_API = `${baseApi}/api/auth/`;
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'user';
const USER_AUTHORITIES = 'auth-authorities';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  login(username: string, password: string): Observable<authResponse> {
    return this.http.post<authResponse>(AUTH_API + 'login', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      username,
      email,
      password
    }, httpOptions);
  }

  signOut(): void {
    window.sessionStorage.clear();
    localStorage.clear
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem('token', token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user : User): void {
    window.sessionStorage.removeItem(USER_KEY);
    const userString = JSON.stringify(user);
    window.sessionStorage.setItem(USER_KEY, userString);
  }

  public getUser(): User | null {
    const userString = window.sessionStorage.getItem(USER_KEY);
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  }

}
