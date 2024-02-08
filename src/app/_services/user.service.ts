import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseApi = environment.apiSpringUrl;
  private apiUrl = `${this.baseApi}/api/auth/`;

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(this.apiUrl + 'test', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(this.apiUrl + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(this.apiUrl + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(this.apiUrl + 'admin', { responseType: 'text' });
  }
  
}
