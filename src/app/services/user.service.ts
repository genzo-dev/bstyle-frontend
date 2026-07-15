import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/registrar`, formData);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuarios/perfil`);
  }

  updateUser(formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/usuarios/perfil`, formData);
  }
}
