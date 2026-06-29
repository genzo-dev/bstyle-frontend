import { Injectable, NgZone, signal } from '@angular/core';
import { User } from '../types/user.type';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, startWith } from 'rxjs';
import { environment } from '../../../environment';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private ngZone: NgZone,
    private http: HttpClient,
    private router: Router,
  ) {}

  private readonly currentUrlList = ['/user'];

  private baseUrl = environment.apiUrl;
  private _user = signal<User | null>(null);
  user = this._user.asReadonly();

  setUser(user: User) {
    this.ngZone.run(() => {
      this._user.set(user);
    });
  }

  async loadUser() {
    const token = localStorage.getItem('auth');
    if (!token) return null;

    try {
      const res = await firstValueFrom(this.http.get<User>(`${this.baseUrl}/usuarios/perfil`));

      this.setUser(res);
      return res;
    } catch (err) {
      console.log('ERRO PERFIL:', err);
      this.logout();
      return null;
    }
  }

  isLogged() {
    return this.user() !== null;
  }

  logout() {
    localStorage.removeItem('auth');

    this.ngZone.run(() => {
      this._user.set(null);
    });

    const currentUrl = this.router.url;

    const isProtected = this.currentUrlList.some((url) => currentUrl.startsWith(url));

    if (isProtected) {
      this.router.navigate(['/login']);
    }
  }
}
